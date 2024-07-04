import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput, createEmergencyAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { addHours, format, parse, parseISO } from 'date-fns';
import { AppointmentStatus, AppointmentType, Appointments, Weekday } from '@prisma/client';
import { VideoCallService } from 'src/video-call/video-call.service';
import { getTimeMilliSeconds } from 'src/utils/timeInMilliSeconds';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleStatus } from 'src/utils/types';
import { equal, strict } from 'assert';
import { decreaseHourByOne } from 'src/utils/converToIso';
import { SocketGateway } from 'src/socket/socket.gateway';
import { databaseDate } from 'src/utils/parseDate';


@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService, private readonly videoCallService: VideoCallService, private readonly scheduleService: ScheduleService, private readonly socket: SocketGateway) { }

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
      console.log(schedule?.WeekDay === WeekDay)

      if (schedule?.WeekDay === WeekDay) {
        schedule = await this.scheduleService.createSchedule({ Date: appointment.AppointmentDate, StartTime: appointment.AppointmentTime, EndTime, DoctorID: appointment.DoctorID, Status: ScheduleStatus.UNAVAILABLE })
      }
      else {
        schedule = await this.scheduleService.updateSchedule({ ScheduleID: appointment.ScheduleID, Date: appointment.AppointmentDate, StartTime: appointment.AppointmentTime, EndTime, DoctorID: appointment.DoctorID, Status: ScheduleStatus.UNAVAILABLE })
        console.log(schedule)
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
  async AcceptAppointment(DoctorID: string, AppointmentID: string, Duration: number) {
    try {
      let appointment = await this.prisma.appointments.findFirst({
        where: {
          AppointmentID,
          DoctorID,
          Status: "pending"
        }
      })


      const schedule = await this.findAndUpdateSchedule(appointment)

      appointment = await this.prisma.appointments.update({
        where: {
          AppointmentID: appointment.AppointmentID
        },
        data: {
          ScheduleID: schedule.ScheduleID,
          Status: "booked",
          Duration
        }
      })
      const Room = await this.updateVideoCallRoomMembersToken(appointment)
      console.log(Room)
      return appointment
    } catch (error) {
      throw error
    }
  }



  //
  async updateAppointment(updateAppointmentInput: UpdateAppointmentInput) {
    const { AppointmentID, AppointmentDate, AppointmentTime, Duration, ...others } = updateAppointmentInput;
    try {

      const existingAppointment = await this.prisma.appointments.findUnique({
        where: {
          AppointmentID
        }
      });

      if (!existingAppointment) {
        throw new Error("Appointment not found");
      }

      const schedule = await this.findAndUpdateSchedule(existingAppointment)

      const appointment = await this.prisma.appointments.update({
        where: {
          AppointmentID
        },
        data: {
          ...others,
          AppointmentDate,
          AppointmentTime,
          Duration,
          ScheduleID: schedule.ScheduleID
        }
      });

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
    console.log(UserID)
    try {
      const upcomingAppointment = await this.prisma.appointments.findMany({
        where: {
          AND: [
            {
              OR: [
                { Status: "pending" },
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
        orderBy: {
          AppointmentDate: "asc"
        }
      })

      const pastAppointment = await this.prisma.appointments.findMany({
        where: {
          AND: [{
            OR: [{

              Status: "completed",
            }, {
              Status: "overDue"
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
        orderBy: {
          AppointmentDate: "desc"
        }
      })

      const upcomingAppointments = upcomingAppointment.map((appointment) => ({
        ...appointment,
        DoctorName: appointment.Doctor.FirstName + " " + appointment.Doctor.LastName,
        DoctorPhoto: appointment.Doctor.ProfilePicture,
        DoctorGender: appointment.Doctor.Gender,
        PatientName: appointment.Patient.FirstName + " " + appointment.Patient.LastName,
        PatientPhoto: appointment.Patient.ProfilePicture,
        PatientGender: appointment.Patient.Gender
      }))


      const pastAppointments = pastAppointment.map((appointment) => ({
        ...appointment,
        DoctorName: appointment.Doctor.FirstName + " " + appointment.Doctor.LastName,
        DoctorPhoto: appointment.Doctor.ProfilePicture,
        DoctorGender: appointment.Doctor.Gender,
        PatientName: appointment.Patient.FirstName + " " + appointment.Patient.LastName,
        PatientPhoto: appointment.Patient.ProfilePicture,
        PatientGender: appointment.Patient.Gender
      }))

      return {
        upcomingAppointments,
        pastAppointments
      }
    } catch (error) {
      throw error
    }
  }



  // 
  async getAppointmentByID(AppointmentID: string) {
    try {
      const appointment = await this.prisma.appointments.findUnique({
        where: {
          AppointmentID
        }
      })
      return appointment
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
}


