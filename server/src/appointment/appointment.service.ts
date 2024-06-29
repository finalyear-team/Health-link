import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput, createEmergencyAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';
import { Appointments, Weekday } from '@prisma/client';
import { VideoCallService } from 'src/video-call/video-call.service';
import { getTimeMilliSeconds } from 'src/utils/timeInMilliSeconds';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleStatus } from 'src/utils/types';


@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService, private readonly videoCallService: VideoCallService, private readonly scheduleService: ScheduleService) { }

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
    try {
      const schedule = await this.prisma.doctorSchedule.findFirst({
        where: {
          AND: [{
            ScheduleID,
          }, {
            DoctorID
          },
          {
            OR: [
              { Date: { equals: date } },
              { WeekDay: selectedDay as Weekday }
            ]
          },
          { ScheduleType: "normal" },
          { Status: "available" },
          {
            EndTime: {
              gt: time
            }
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

  // checks slot availablity and update availablity of the slot
  async findAndUpdateSchedule(appointment: Appointments) {
    const WeekDay = format(appointment.AppointmentDate.toISOString(), "EEEE").toLowerCase() as Weekday

    const EndTime = new Date(this.notValidBeforTime(appointment.AppointmentDate, appointment.AppointmentTime))
    try {
      let schedule = await this.isSelectedDateAvailable(appointment.ScheduleID, appointment.DoctorID, appointment.AppointmentDate, appointment.AppointmentTime)

      if (schedule.WeekDay === WeekDay) {
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
    const { DoctorID, ScheduleID, PatientID, AppointmentDate, AppointmentTime, Note, Status, AppointmentType } = createAppointmentInput
    if (!await this.isSelectedDateAvailable(ScheduleID, DoctorID, AppointmentDate, AppointmentTime))
      throw new Error("this slot is not available")

    const { createdRoom: { RoomID } } = await this.videoCallService.getRoom(DoctorID, PatientID)

    if (!RoomID)
      throw new Error("no room created for consultation")
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
          VideoChatRoomID: RoomID,
          Note
        }
      })
      console.log(Appointment)
      return Appointment
    } catch (error) {
      console.log(error)
      throw error
    }
  }



  //
  async AcceptedAppointment(DoctorID: string, AppointmentID: string, Duration: number) {
    try {
      let appointment = await this.prisma.appointments.update({
        where: {
          AppointmentID,
          DoctorID,
          Status: "pending"
        },
        data: {
          Status: "booked",
          Duration,
        }
      })

      const schedule = await this.findAndUpdateSchedule(appointment)

      appointment = await this.prisma.appointments.update({
        where: {
          AppointmentID: appointment.AppointmentID
        },
        data: {
          ScheduleID: schedule.ScheduleID
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
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          OR: [
            { DoctorID: UserID },
            { PatientID: UserID }
          ]
        }
      })
      return appointments
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
