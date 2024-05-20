import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertToIso } from 'src/utils/converToIso';
import { validateEndTime } from 'src/utils/validateTime';
import { startWith } from 'rxjs';
import { Weekday } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) { }


  async checkIfTheSlotIsAlreadyRegistered(StartTime: any, EndTime: any, WeekDay?: Weekday, date?: Date,) {
    try {
      console.log(date)
      const slot = await this.prisma.doctorSchedule.findFirst({
        where: {
              OR:[{
                AND:[
                 { WeekDay},
                  {
                    StartTime: {
                      equals: StartTime
                    }
                  }
                    , {
                    EndTime: {
                      equals: EndTime
                    }
                  }
                ]
              },{
              AND:[
                { Date:{
                  equals:date
                }},
                 {
                   StartTime: {
                     equals: StartTime
                   }
                 }
                   , {
                   EndTime: {
                     equals: EndTime
                   }
                 }
               ]}
            ]
              

        


        }
      })
      console.log(slot)
      return slot

    } catch (error) {
      throw error

    }

  }


  async findNextEmergencySlot(DoctorID: string) {
    const scheduleDate = new Date(new Date().toDateString())
    try {
      const latestAvailableSlot = await this.prisma.doctorSchedule.findFirst({
        where: {
          DoctorID,
          Status: "available",
          Date: scheduleDate
        },
        orderBy: {
          EndTime: "desc"
        }
      })
      console.log(latestAvailableSlot)
      return latestAvailableSlot
    } catch (error) {
      throw error
    }

  }


  async createSchedule(createScheduleInput: CreateScheduleInput) {
    const { Date: selectedDate, StartTime: selectedStartTime, EndTime: selectedEndTime, ...others } = createScheduleInput
    const scheduleDate =selectedDate&&new Date(selectedDate)
    const StartTime = convertToIso(selectedStartTime)
    const EndTime = convertToIso(selectedEndTime)
    if (!validateEndTime(StartTime, EndTime))
      throw new HttpException("end-time should be greater than start-time", HttpStatus.BAD_REQUEST)
    if (await this.checkIfTheSlotIsAlreadyRegistered(StartTime, EndTime, createScheduleInput.WeekDay, scheduleDate))
      throw new HttpException("already scheduled", HttpStatus.BAD_REQUEST)
    try {
      const schedule = await this.prisma.doctorSchedule.create({
        data: {
          Date: scheduleDate,
          StartTime,
          EndTime,
          ...others,
        }
      })
      console.log(schedule)
      return schedule
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  async createEmergencySchedule(EmergencyScheduleInput: EmergencyScheduleInput) {
    const { DoctorID, EndTime } = EmergencyScheduleInput
    const scheduleDate = new Date(new Date().toDateString())
    console.log(scheduleDate)
    const StartTime = new Date().toISOString().slice(11, 19)
    console.log(StartTime)
    try {
      const emergencySchedule = await this.prisma.doctorSchedule.create({
        data: {
          DoctorID,
          Date: scheduleDate,
          StartTime,
          EndTime,
          ScheduleType: "emergency"
        },
      })

      return emergencySchedule
    } catch (error) {

    }

  }

  async updateSchedule(updateScheduleInput: UpdateScheduleInput) {
    const { ScheduleID, DoctorID, ...others } = updateScheduleInput
    try {
      const schedule = await this.prisma.doctorSchedule.update({
        where: {
          ScheduleID,
          AND: [{
            DoctorID
          }]
        },
        data: { ...others }
      })
      console.log(schedule)
      return schedule
    } catch (error) {
      console.log(error)
      throw error

    }

  }


  async schedules(DoctorID: string) {
    try {
      const schedules = await this.prisma.doctorSchedule.findMany({
        where: {
          DoctorID
        }
      })
      console.log(schedules)
      return schedules
    } catch (error) {
      console.log(error)

    }
  }


  async EmergencySchedules() {
    const today = new Date()
    const currentDay = new Date(today.toDateString())
    const StartTime = today.toISOString().slice(11, 19)
    const EndTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
    console.log(EndTime)
    try {
      const emergencySchedules = await this.prisma.doctorSchedule.findMany({
        where: {
          ScheduleType: "emergency",
          AND: [{
            Date: {
              equals: currentDay
            }
          }, {
            StartTime: {
              equals: StartTime
            }
          },
          {
            EndTime: {
              lt: EndTime
            }
          }
          ]
        }

      })
      console.log(emergencySchedules)
      return emergencySchedules
    } catch (error) {
      throw error

    }
  }



}
