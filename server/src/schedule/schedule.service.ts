import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertToIso, createCurrentDateWithTimeString } from 'src/utils/converToIso';
import { validateEndTime } from 'src/utils/validateTime';
import { DoctorSchedule, ScheduleType, Weekday } from '@prisma/client';
import { format } from 'date-fns';
import { parseDate } from 'src/utils/parseDate';
import { ScheduleStatus } from 'src/utils/types';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {
  }
  // 
  async checkIfTheSlotIsAlreadyRegistered(DoctorID: string, StartTime: any, EndTime: any, ScheduleType: ScheduleType, WeekDay?: Weekday[], date?: Date) {
    try {
      console.log(WeekDay)
      console.log(date)
      const conditions = [];
      const TimeCondition = {
        OR: [
          {
            AND: [
              { StartTime: { lte: StartTime } },
              { EndTime: { gte: StartTime } },
            ],
          },
          {
            AND: [
              { StartTime: { lte: EndTime } },
              { EndTime: { gte: EndTime } },
            ],
          },
          {
            AND: [
              { StartTime: { gte: StartTime } },
              { EndTime: { lte: EndTime } },
            ],
          },
          {
            AND: [
              { StartTime: { equals: StartTime } },
              { EndTime: { equals: EndTime } },
            ],
          },
        ],
      };


      if (WeekDay && WeekDay.length > 0) {
        console.log(" weekday condition")
        WeekDay.forEach(day => conditions.push({
          AND: [
            { WeekDay: day },
            TimeCondition
          ],

        }))
          ;
      }

      if (date) {
        console.log("date condition")
        const dayOfWeek = format(date.toISOString(), 'EEEE').toLowerCase(); // Get the full name of the day of the week
        conditions.push({
          AND: [
            { Date: { equals: date } },
            TimeCondition

          ]
        });
        conditions.push({
          AND: [
            { WeekDay: dayOfWeek },
            TimeCondition
          ]
        });
      }

      console.log(conditions.forEach(condition => console.log(condition)))

      const slot = await this.prisma.doctorSchedule.findFirst({
        where: {
          DoctorID,
          Status: "available",
          ScheduleType,
          OR: conditions
        }
      });
      console.log(slot)
      return slot;
    } catch (error) {
      throw error;
    }
  }




  //
  async createSchedule(createScheduleInput: CreateScheduleInput) {
    const { Date, StartTime, EndTime, WeekDay, Note, DoctorID, Status } = createScheduleInput

    if (await this.checkIfTheSlotIsAlreadyRegistered(DoctorID, StartTime, EndTime, "normal", WeekDay, Date))
      throw new HttpException("availablity already occupied", HttpStatus.BAD_REQUEST)

    try {
      const scheduleInput = WeekDay && WeekDay.map((weekday) => ({
        DoctorID,
        WeekDay: weekday,
        StartTime,
        EndTime,
        Status
      }))
      let schedule: any

      if (WeekDay && WeekDay.length > 0) {
        schedule = await this.prisma.$transaction(async (prisma) => {
          // Create many files
          await prisma.doctorSchedule.createMany({
            data: scheduleInput,
            skipDuplicates: true
          });

          // Retrieve the created files
          const createdFiles = await prisma.doctorSchedule.findMany({
            where: {
              DoctorID
            }
          });

          return createdFiles;
        });
      }

      if (Date) {
        schedule = await this.prisma.$transaction(async (prisma) => {
          // Create many files
          await prisma.doctorSchedule.createMany({
            data: {
              DoctorID,
              Date,
              StartTime,
              EndTime,
              Note,
            },
            skipDuplicates: true
          });

          // Retrieve the created files
          const createdFiles = await prisma.doctorSchedule.findMany({
            where: {
              DoctorID
            }
          });

          return createdFiles;
        });
      }

      return schedule
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  //
  async createEmergencySchedule(EmergencyScheduleInput: EmergencyScheduleInput) {
    const { DoctorID, EndTime } = EmergencyScheduleInput
    const scheduleDate = new Date(format(new Date().toDateString(), "yyy-MM-dd"))
    const WeekDay = format(scheduleDate.toISOString(), "EEEE").toLowerCase() as Weekday
    const StartTime = new Date()
    try {
      const isEndTimeOccupied = await this.prisma.doctorSchedule.findFirst({
        where: {
          DoctorID,
          Status: "available",
          OR: [
            {
              EndTime: { lte: EndTime },
              Date: { equals: scheduleDate }
            },
            {
              EndTime: { lte: EndTime },
              WeekDay
            }
          ]
        }
      })
      if (isEndTimeOccupied)
        throw new Error("Endtime already occupied")
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
      throw error

    }
  }


  //
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
      return schedule
    } catch (error) {
      console.log(error)
      throw error.message
    }
  }



  //
  async autoEmergencyScheduleUpdate() {
    const today = new Date()
    try {
      const schedules = await this.prisma.doctorSchedule.updateMany({
        where: {
          ScheduleType: "emergency",
          Date: today,
          EndTime: {
            lt: new Date()
          },
          Status: 'available'
        },
        data: {
          Status: "unavailable",
        },
      })
      console.log(schedules)
      return schedules
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  //
  async schedules(DoctorID: string) {
    console.log("schedulessss")
    try {
      const schedules = await this.prisma.doctorSchedule.findMany({
        where: {
          DoctorID,
          Status: "available",
          ScheduleType: "normal"
        }
      })
      console.log(schedules)
      return schedules
    } catch (error) {
      console.log(error)

    }
  }


  //
  async emergencySchedules() {
    const today = new Date()
    const scheduleDate = new Date(format(new Date().toISOString(), "yyyy-MM-dd"))
    try {
      const emergencySchedules = await this.prisma.doctorSchedule.findMany({
        where: {
          ScheduleType: "emergency",
          Status: "available",
          AND: [
            {
              Date: {
                equals: scheduleDate
              },
            },
            {
              EndTime: {
                gt: today
              }

            }
          ]


        }
      })
      return emergencySchedules
    } catch (error) {
      throw error
    }
  }


  // 
  async getScheduleByDate(DoctorID: string, date: string,) {
    const selectedDate = new Date(format(parseDate(date), "yyyy-MM-dd"))
    const WeekDay = format(parseDate(date), 'EEEE').toLowerCase() as Weekday;
    try {
      const schedules = await this.prisma.doctorSchedule.findMany({
        where: {
          DoctorID,
          OR: [
            {
              Date: {
                equals: selectedDate
              }
            },
            { WeekDay }
          ]

        }
      })


      return schedules
    } catch (error) {
      throw error
    }
  }

  //



}
