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
import { removed } from 'dompurify';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {
  }
  // 
  async checkIfTheSlotIsAlreadyRegistered(DoctorID: string, StartTime: any, EndTime: any, ScheduleType: ScheduleType, WeekDay?: Weekday[], date?: Date) {
    try {
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
        WeekDay.forEach(day => conditions.push({
          AND: [
            { WeekDay: day },
            TimeCondition
          ],

        }))
          ;
      }

      if (date) {
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


      const slot = await this.prisma.doctorSchedule.findFirst({
        where: {
          DoctorID,
          Status: "available",
          ScheduleType,
          OR: conditions
        }
      });
      return slot;
    } catch (error) {
      throw error;
    }
  }



  async createOrUpdateSchedule(createScheduleInput: CreateScheduleInput, unselectedDays: Weekday[]) {
    const { Date, StartTime, EndTime, WeekDay, Note, DoctorID, Status, ScheduleType } = createScheduleInput;


    // Step 1: Check for existing schedules
    const scheduelsToDelete = await this.prisma.doctorSchedule.findMany({
      where: {
        DoctorID,
        WeekDay: {
          in: unselectedDays
        }
      }
    })

    const existingSchedules = WeekDay ? await this.prisma.doctorSchedule.findMany({
      where: {
        DoctorID,
        WeekDay: { in: WeekDay },
        ScheduleType: ScheduleType || "normal"
      }
    }) : [];

    const existingDays = existingSchedules.map(schedule => schedule.WeekDay);


    // Step 2: Determine which days need to be updated and which need to be created
    const daysToUpdate = WeekDay ? WeekDay.filter(day => existingDays.includes(day)) : [];
    const daysToCreate = WeekDay ? WeekDay.filter(day => !existingDays.includes(day)) : [];


    // delete unselectedSchedules
    const deletedSchedules = scheduelsToDelete.map((schedule) =>
      this.prisma.doctorSchedule.delete({
        where: {
          ScheduleID: schedule.ScheduleID
        }
      }))
    // Step 3: Update existing schedules
    const updatePromises = existingSchedules.map(schedule =>
      this.prisma.doctorSchedule.update({
        where: {
          ScheduleID: schedule.ScheduleID,
          WeekDay: schedule.WeekDay,
          ScheduleType: ScheduleType || "normal"
        },
        data: {
          StartTime,
          EndTime,
          Status,
          Note
        }
      })
    );

    // Step 4: Create new schedules
    const createPromises = daysToCreate.map(day =>
      this.prisma.doctorSchedule.create({
        data: {
          DoctorID,
          WeekDay: day,
          StartTime,
          EndTime,
          Status,
          Note,
          ScheduleType: ScheduleType || "normal"
        }
      })
    );

    // Step 5: Execute updates and creations in parallel
    try {
      await Promise.all([...deletedSchedules, ...updatePromises, ...createPromises]);

      // Return the updated and created schedules
      const updatedSchedules = await this.prisma.doctorSchedule.findMany({
        where: {
          DoctorID,
          WeekDay: { in: WeekDay },
          ScheduleType: ScheduleType || "normal"
        }
      });

      return updatedSchedules;
    } catch (error) {
      console.error(error);
      throw new HttpException("Error while creating or updating schedules", HttpStatus.INTERNAL_SERVER_ERROR);
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
      let WeekdaySchedules: any[]

      if (WeekDay && WeekDay.length > 0) {
        WeekdaySchedules = await this.prisma.$transaction(async (prisma) => {
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
        schedule = await this.prisma.doctorSchedule.create({
          data: {
            DoctorID,
            Date,
            StartTime,
            EndTime,
            Note,
            Status
          }
        });

      }

      return WeekdaySchedules && WeekdaySchedules.length > 0 ? WeekdaySchedules : schedule
    } catch (error) {
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
    return null
    try {
      // const schedule = await this.prisma.doctorSchedule.update({
      //   where: {
      //     ScheduleID,
      //     AND: [{
      //       DoctorID
      //     }]
      //   },
      //   data: { ...others }
      // })
      // return schedule
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
      return schedules
    } catch (error) {
      throw error
    }
  }


  //
  async schedules(DoctorID: string) {
    try {
      const schedules = await this.prisma.doctorSchedule.findMany({
        where: {
          DoctorID,
          Status: "available",
          ScheduleType: "normal"
        }
      })
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
          Status: "available",
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


  async removeSchedule(ScheduleID: string) {
    try {
      const schedules = await this.prisma.doctorSchedule.delete({
        where: {
          ScheduleID
        }
      })


      return schedules
    } catch (error) {
      throw error
    }
  }
  //
}






