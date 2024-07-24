import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput, createEmergencyAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { addHours, differenceInHours, format, parse, parseISO } from 'date-fns';
import { AppointmentStatus, AppointmentType, Appointments, UserType, Weekday, notificationType } from '@prisma/client';
import { VideoCallService } from 'src/video-call/video-call.service';
import { getTimeMilliSeconds, mergeDates } from 'src/utils/timeInMilliSeconds';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleStatus, UpdateAppointmentType } from 'src/utils/types';
import { decreaseHourByOne } from 'src/utils/converToIso';
import { SocketGateway } from 'src/socket/socket.gateway';
import { databaseDate } from 'src/utils/parseDate';
import { Cron } from '@nestjs/schedule';
import { isDateIn24Hours } from 'src/utils/validateTime';
import { error } from 'console';
import { UserService } from 'src/user/user.service';
import { getFormatedDate, getFormatedTime } from 'src/utils/TimeZoneConverter';
import { PaymentService } from 'src/payment/payment.service';
import { StreamChatService } from 'src/stream-chat/stream-chat.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly streamChat: StreamChatService, private readonly prisma: PrismaService, private readonly videoCallService: VideoCallService, private readonly scheduleService: ScheduleService, private readonly socket: SocketGateway, private readonly userService: UserService, private readonly paymentservice: PaymentService) { }





  //
  notValidBeforTime(AppointmentDate: Date, AppointmentTime: Date) {
    const appointmentTimeInMilliseconds = getTimeMilliSeconds(AppointmentTime)
    const tokenNotValidBefore = (AppointmentDate.getTime() + appointmentTimeInMilliseconds) / 1000
    return tokenNotValidBefore
  }



  //
  async isSelectedDateAvailable(ScheduleID: string, DoctorID: string, date: Date, time: Date) {

    const selectedDay = format(date.toISOString(), "EEEE").toLowerCase()

    console.log(selectedDay)

    const selectedTime = decreaseHourByOne(time)



    try {
      const schedule = await this.prisma.doctorSchedule.findFirst({
        where: {
          ScheduleID,
          DoctorID,
          OR: [{
            WeekDay: selectedDay as Weekday
          },
          {
            Date: {
              equals: date
            }
          }
          ],
          AND: [
            {
              Status: "available",
            },
            {
              ScheduleType: "normal"
            }, {
              OR: [
                {
                  EndTime: {
                    lte: selectedTime
                  },
                }, {
                  EndTime: {
                    gte: selectedTime
                  }
                }
              ]

            }

          ]

        }

      })
      console.log(schedule)
      return schedule
    } catch (error) {
      throw error
    }
  }


  async isAppointmentPendingOrBooked(ScheduleID: string, DoctorID: string, PatientID: string, AppointmentDate: Date, AppointmentTime: Date) {



    console.log(AppointmentDate)
    try {
      const pendingAppo = await this.prisma.appointments.findFirst({
        where: {
          ScheduleID,
          PatientID,
          DoctorID,
          AppointmentDate: {
            equals: databaseDate(AppointmentDate)
          },
          OR: [{
            Status: "booked",
          }, {
            Status: "pending"
          }],
          AppointmentTime: {
            equals: AppointmentTime
          }
        }
      })
      return pendingAppo


    } catch (error) {
      throw error


    }
  }

  // checks slot availablity and update availablity of the slot
  async findAndUpdateSchedule(appointment: Appointments) {
    const WeekDay = format(addHours(appointment.AppointmentDate, 24).toISOString(), "EEEE").toLowerCase() as Weekday

    console.log(WeekDay)

    const EndTime = new Date(this.notValidBeforTime(appointment.AppointmentDate, appointment.AppointmentTime))

    try {

      let schedule = await this.isSelectedDateAvailable(appointment.ScheduleID, appointment.DoctorID, addHours(appointment.AppointmentDate, 24), appointment.AppointmentTime)

      if (schedule?.WeekDay === WeekDay) {

        schedule = await this.scheduleService.createSchedule({ Date: appointment.AppointmentDate, StartTime: appointment.AppointmentTime, EndTime, DoctorID: appointment.DoctorID, Status: ScheduleStatus.UNAVAILABLE })
      }
      else {
        schedule = await this.scheduleService.updateSchedule({ ScheduleID: appointment.ScheduleID, Date: appointment.AppointmentDate, StartTime: appointment.AppointmentTime, EndTime, DoctorID: appointment.DoctorID, Status: ScheduleStatus.UNAVAILABLE })
      }

      return schedule

    } catch (error) {
      console.log(error)
      throw error

    }
  }




  //
  async updateVideoCallRoomMembersToken(appointment: Appointments) {
    const { AppointmentDate, ScheduleID, VideoChatRoomID: RoomID, AppointmentTime, DoctorID, PatientID, Duration: validHours } = appointment
    try {
      const tokenNotValidBefore = this.notValidBeforTime(AppointmentDate, AppointmentTime)

      const { HostAuthToken, MemberAuthToken } = await this.videoCallService.generateToken(RoomID, DoctorID, PatientID, tokenNotValidBefore, validHours * 3600)

      let Room: any

      if (HostAuthToken && MemberAuthToken) {
        Room = await this.videoCallService.updateToken({ RoomID, HostID: DoctorID, MemberID: PatientID, HostAuthToken, MemberAuthToken })
      }
      return Room

    } catch (error) {
      throw error
    }
  }


  //
  async createAppointment(createAppointmentInput: CreateAppointmentInput) {

    const { DoctorID, ScheduleID, PatientID, AppointmentDate, AppointmentTime, Note, Status, AppointmentType, VideoChatRoomID } = createAppointmentInput

    console.log(AppointmentTime)



    if (!await this.isSelectedDateAvailable(ScheduleID, DoctorID, AppointmentDate, AppointmentTime))
      throw new Error("this slot is not available")
    if (await this.isAppointmentPendingOrBooked(ScheduleID, DoctorID, PatientID, AppointmentDate, AppointmentTime))
      throw new Error("this appointment is already pending or booked. try different date")

    try {
      const Appointment = await this.prisma.appointments.create({
        data: {
          DoctorID,
          PatientID,
          ScheduleID,
          AppointmentDate,
          AppointmentTime,
          Status,
          AppointmentType,
          VideoChatRoomID,
          Note
        },
        include: {
          Doctor: true,
          Patient: true
        }
      })



      this.socket.create(Appointment)
      return Appointment
    } catch (error) {
      console.log(error)
      throw error
    }
  }




  //
  async AcceptAppointment(DoctorID: string, AppointmentID: string, Duration: number, Status: AppointmentStatus) {
    try {
      let appointment = await this.prisma.appointments.findFirst({
        where: {
          AppointmentID,
          DoctorID,
          Status
        },
        include: {
          Doctor: {
            select: {
              UserID: true,
              FirstName: true,
              LastName: true,
              Role: true,
              DoctorDetails: {
                select: {
                  ConsultationFee: true
                }
              }
            }
          },
          Patient: {
            select: {
              UserID: true,
              FirstName: true,
              LastName: true,
              Role: true
            }

          }
        }

      })
      console.log(appointment)
      const schedule = await this.findAndUpdateSchedule(appointment)
      console.log(schedule)
      if (!schedule)
        throw new Error("come on man")

      appointment = await this.prisma.appointments.update({
        where: {
          AppointmentID: appointment.AppointmentID
        },
        data: {
          ScheduleID: schedule.ScheduleID,
          Status: "booked",
          Duration
        },
        include: {
          Doctor: {
            select: {
              UserID: true,
              FirstName: true,
              LastName: true,
              Role: true,
              DoctorDetails: {
                select: {
                  ConsultationFee: true
                }
              }
            }
          },
          Patient: {
            select: {
              UserID: true,
              FirstName: true,
              LastName: true,
              Role: true
            }

          }
        }

      })

      const Room = await this.updateVideoCallRoomMembersToken(appointment)
      const chatChannel = await this.streamChat.createDmChannel(appointment.DoctorID, appointment.PatientID)
      console.log("chat channel")
      console.log(chatChannel)
      const name = `${Status === AppointmentStatus.reschedulePending ? `${appointment.Patient.FirstName} ${appointment.Patient.LastName}` : ` Dr . ${appointment.Doctor.FirstName} ${appointment.Doctor.LastName}`}`;

      this.socket.appointmentNotification({
        notificationType: notificationType.acceptAppointment,
        message: `${name}  Accepted your Appointment scheduled for ${format(addHours(appointment.AppointmentDate, 24), "yyyy-MM-dd")} ${format(addHours(appointment.AppointmentTime, 1), "hh:mm a")} `,
        UserID: appointment.PatientID,
        appointment: appointment
      })
      return appointment
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  async declineAppointment(
    CancelledBy: string, AppointmentID: string, Reason: string
  ) {
    try {
      const cancelledAppointment = await this.prisma.appointments.update({
        where: {
          AppointmentID
        },
        data: {
          Status: "cancelled",
          CancelledBy,
          CancelledReason: Reason
        },
        include: {
          Cancelled: {
            select: {
              FirstName: true,
              LastName: true,
              Role: true,
            }
          }
        }
      })

      const selectedSchedule = await this.prisma.doctorSchedule.findUnique({
        where: {
          ScheduleID: cancelledAppointment.ScheduleID
        }
      })

      if (selectedSchedule.Date) {
        const deletedSchedule = await this.prisma.doctorSchedule.delete({
          where: {
            ScheduleID: selectedSchedule.ScheduleID
          }
        })
        console.log(deletedSchedule)
      }

      this.socket.appointmentNotification({
        notificationType: notificationType.cancelAppointment,
        message: `${cancelledAppointment.Cancelled.Role === UserType.doctor ? "Dr." : ""} ${cancelledAppointment.Cancelled.FirstName} ${cancelledAppointment.Cancelled.LastName} Cancelled appointment scheduled for ${format(addHours(cancelledAppointment.AppointmentDate, 24), "yyyy-MM-dd")} ${format(addHours(cancelledAppointment.AppointmentTime, 1), "hh:mm a")} `,
        UserID: cancelledAppointment.DoctorID === CancelledBy ? cancelledAppointment.PatientID : cancelledAppointment.PatientID,
        appointment: cancelledAppointment
      })
      return cancelledAppointment
    } catch (error) {
      throw error

    }
  }


  async rescheduleAppointment(updateAppointmentInput: UpdateAppointmentInput) {
    const { ScheduleID, AppointmentID, AppointmentDate, AppointmentTime, DoctorID, PatientID, UpdatedBy } = updateAppointmentInput
    try {

      if (!await this.isSelectedDateAvailable(ScheduleID, DoctorID, addHours(AppointmentDate, 24), AppointmentTime))
        throw new Error("this slot is not available")

      if (await this.isAppointmentPendingOrBooked(ScheduleID, DoctorID, PatientID, AppointmentDate, AppointmentTime))
        throw new Error("this appointment is already pending or booked. try different date")

      const user = await this.userService.getUserDetails(UpdatedBy)



      const Status = user.Role === UserType.doctor ? AppointmentStatus.reschedulePending : AppointmentStatus.pending




      const appointment = await this.prisma.appointments.update({
        where: {
          AppointmentID
        },
        data: {
          AppointmentTime,
          AppointmentDate,
          ScheduleID,
          UpdatedBy,
          Status
        },
        include: {
          Updated: {
            select: {
              UserID: true,
              Role: true,
              FirstName: true,
              LastName: true
            }
          }
        }
      })
      this.socket.appointmentNotification({
        notificationType: notificationType.cancelAppointment,
        message: `${appointment.Updated.Role === UserType.doctor ? "Dr." : ""} ${appointment.Updated.FirstName} ${appointment.Updated.LastName} Rescheduled the  appointment scheduled for ${format(addHours(appointment.AppointmentDate, 24), "yyyy-MM-dd")} ${format(addHours(appointment.AppointmentTime, 1), "hh:mm a")} `,
        UserID: appointment.DoctorID === appointment.UpdatedBy ? appointment.PatientID : appointment.DoctorID,
        appointment: appointment
      })
      console.log(appointment)
      return appointment
    } catch (error) {
      throw error
    }

  }
  //
  async updateAppointment(updateAppointmentInput: UpdateAppointmentInput) {
    const { ScheduleID, AppointmentID, AppointmentDate, AppointmentTime, Duration, UpdatedBy, updateType, CancelledBy, CancelledReason, Status, ...others } = updateAppointmentInput;
    try {

      const existingAppointment = await this.prisma.appointments.findUnique({
        where: {
          AppointmentID
        }
      });

      if (!existingAppointment) {
        throw new Error("Appointment not found");
      }


      if (!AppointmentDate && !AppointmentTime && !UpdatedBy && !CancelledBy && !CancelledReason && Status) {
        const changedAppointment = await this.prisma.appointments.update({
          where: {
            AppointmentID
          }, data: {
            Status
          }
        })
        console.log("status changed appointment")
        console.log(changedAppointment)
        return changedAppointment
      }

      const mergedDate = mergeDates(AppointmentDate, AppointmentTime)
      const isDateInValid = isDateIn24Hours(mergedDate)
      if (isDateInValid)
        throw new Error(`can't ${updateType === UpdateAppointmentType.CANCELAPPOINTMENT ? "Cancel appointment" : "reschedule appointment "} because the appointment date is within 24 hours`)

      const appointment = await this.rescheduleAppointment(updateAppointmentInput)
      const removedSchedule = await this.prisma.doctorSchedule.delete({
        where: {
          ScheduleID: existingAppointment.ScheduleID
        }
      })


      // Update the video call room
      const Room = await this.updateVideoCallRoomMembersToken(appointment);
      console.log(Room)


      return appointment;
    } catch (error) {
      throw error;
    }
  }


  //
  async getAppointments(UserID: string) {
    try {
      const upcomingAppointment = await this.prisma.appointments.findMany({
        where: {
          AND: [
            {
              OR: [
                { Status: "pending" },
                { Status: "reschedulePending" },
                { Status: "booked" },
              ]
            }, {
              OR: [
                { DoctorID: UserID },
                { PatientID: UserID }
              ]
            }
          ],
        },
        include: {
          Doctor: true,
          Patient: true

        },
        orderBy: [
          {
            AppointmentDate: "asc",
          },
          {
            AppointmentTime: "asc",
          }
        ]
      })


      const pastAppointment = await this.prisma.appointments.findMany({
        where: {
          AND: [{
            OR: [{

              Status: "completed",
            }, {
              Status: "overdue"
            }]
          }, {

            OR: [
              { DoctorID: UserID },
              { PatientID: UserID }
            ]

          }]
        },
        include: {
          Doctor: true,
          Patient: true

        },
        orderBy: [
          {
            AppointmentDate: "asc",
          },
          {
            AppointmentTime: "asc",
          }
        ]
      })

      const upcomingAppointments = upcomingAppointment.map((appointment) => ({
        ...appointment,
        CreatedAt: appointment.CreatedAt,
        DoctorName: appointment.Doctor.FirstName + " " + appointment.Doctor.LastName,
        DoctorPhoto: appointment.Doctor.ProfilePicture,
        DoctorGender: appointment.Doctor.Gender,
        PatientName: appointment.Patient.FirstName + " " + appointment.Patient.LastName,
        Duration: appointment.Duration,
        PatientPhoto: appointment.Patient.ProfilePicture,
        PatientDOB: appointment.Patient.DateOfBirth,
        Note: appointment.Note,
        PatientGender: appointment.Patient.Gender
      }))


      const pastAppointments = pastAppointment.map((appointment) => ({
        ...appointment,
        CreatedAt: appointment.CreatedAt,
        DoctorName: appointment.Doctor.FirstName + " " + appointment.Doctor.LastName,
        DoctorPhoto: appointment.Doctor.ProfilePicture,
        DoctorGender: appointment.Doctor.Gender,
        PatientName: appointment.Patient.FirstName + " " + appointment.Patient.LastName,
        PatientDOB: appointment.Patient.DateOfBirth,
        PatientPhoto: appointment.Patient.ProfilePicture,
        PatientGender: appointment.Patient.Gender
      }))


      return {
        upcomingAppointments,
        pastAppointments
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }



  // 
  async getAppointmentByID(AppointmentID: string) {
    try {
      const UserSelect = {
        Username: true,
        FirstName: true,
        LastName: true,
        Verified: true,
        Gender: true,
        ProfilePicture: true,
        DateOfBirth: true
      }
      const { Doctor, Patient, ...others } = await this.prisma.appointments.findUnique({
        where: {
          AppointmentID
        },
        include: {
          Doctor: { select: UserSelect },
          Patient: { select: UserSelect }
        }
      })
      return {
        ...others,
        CreatedAt: others.CreatedAt,
        DoctorName: Doctor.FirstName + " " + Doctor.LastName,
        DoctorPhoto: Doctor.ProfilePicture,
        DoctorGender: Doctor.Gender,
        PatientName: Patient.FirstName + " " + Patient.LastName,
        PatientDOB: Patient.DateOfBirth,
        PatientPhoto: Patient.ProfilePicture,
        PatientGender: Patient.Gender
      }
    } catch (error) {
      throw error
    }

  }


  // 

  async filterUserAppointments(UserID: string, Query: string) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          PatientID: UserID,
          OR: [
            {
              AppointmentID: {
                contains: Query
              }
            },
            {
              DoctorID: {
                contains: Query
              }
            },
            {
              AppointmentType: {
                equals: Query as AppointmentType
              },
            },
            {
              Status: {
                equals: Query as AppointmentStatus
              },

            },
            {
              Doctor: {
                OR: [{
                  FirstName: {
                    contains: Query
                  }
                },
                {
                  LastName: {
                    contains: Query
                  }
                },
                {
                  Username: {
                    contains: Query
                  }
                }

                ]
              }
            }

          ]

        }
      })

      return appointments

    } catch (error) {
      throw error

    }

  }

  async filterDoctorAppointments(DoctorID: string, Query: string) {
    try {

      const appointments = await this.prisma.appointments.findMany({
        where: {
          DoctorID,
          OR: [
            {
              AppointmentID: {
                contains: Query
              }
            },
            {
              PatientID: {
                contains: Query
              }
            },
            {
              AppointmentType: {
                equals: Query as AppointmentType
              },
            },
            {
              Status: {
                equals: Query as AppointmentStatus
              },

            },
            {
              Patient: {
                OR: [{
                  FirstName: {
                    contains: Query
                  }
                },
                {
                  LastName: {
                    contains: Query
                  }
                },
                {
                  Username: {
                    contains: Query
                  }
                }

                ]
              }
            }

          ]

        }
      })

      return appointments

    } catch (error) {
      throw error

    }

  }

  async filterAppointments(Query: string) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          OR: [{

          }]
        }
      })

    } catch (error) {

    }

  }

  async remove(AppointmentID: string) {
    try {
      const appointment = await this.prisma.appointments.delete({
        where: {
          AppointmentID
        }
      })
      return appointment
    } catch (error) {
      throw error

    }
  }

  @Cron("* * 1 * * *")
  async updateAppointmentStatus() {
    const currentDate = new Date()
    try {
      const appointments = await this.prisma.appointments.updateMany({
        where: {
          OR: [
            {
              AppointmentDate: {
                lt: currentDate, // Date is before current date
              },
              Status: {
                notIn: ["completed", "overdue", "cancelled"], // Status not in these values
              }
            },
            {
              AND: [
                {
                  AppointmentDate: {
                    equals: currentDate // Date is equal to current date
                  }
                },
                {
                  AppointmentTime: {
                    lt: currentDate // Appointment time is before current date and time
                  }
                },
                {
                  Status: {
                    notIn: ["completed", "overdue", "cancelled"], // Status not in these values
                  }
                }
              ]
            }
          ]
        },
        data: {
          Status: "overdue"
        }
      })

      // console.log("overdue appointments")

      // console.log(appointments)

    } catch (error) {
      console.log(error)
      throw error

    }
  }

}


