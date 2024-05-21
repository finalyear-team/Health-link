import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertToIso } from 'src/utils/converToIso';
import { validateEndTime } from 'src/utils/validateTime';
import { startWith } from 'rxjs';
import { Weekday } from '@prisma/client';
import { error } from 'console';
import { format, parseISO } from 'date-fns';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) { 
  }
// 
  async checkIfTheSlotIsAlreadyRegistered(StartTime: any, EndTime: any, WeekDay?: Weekday, date?: Date,) {
        try {
      const conditions = [];
    if (WeekDay) {
      conditions.push({
        AND: [
          { WeekDay },
          { StartTime: { equals: StartTime } },
          { EndTime: { equals: EndTime } }
        ]
      });
    }
    if (date) {
      const dayOfWeek = format(date.toISOString(), 'EEEE').toLowerCase(); // Get the full name of the day of the week
      console.log(dayOfWeek)
      conditions.push({
          AND: [
              { Date: { equals: date } },
              { StartTime: { equals: StartTime } },
              { EndTime: { equals: EndTime } }
          ]
      });
      conditions.push({
          AND: [
              { WeekDay: dayOfWeek },
              { StartTime: { equals: StartTime } },
              { EndTime: { equals: EndTime } }
          ]
      });
  }
    const slot = await this.prisma.doctorSchedule.findFirst({
      where: {
        Status:"available",
        ScheduleType:"normal"
        // OR: conditions
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
        const { Date, StartTime, EndTime, WeekDay,Note ,DoctorID} = createScheduleInput
        
        if (await this.checkIfTheSlotIsAlreadyRegistered(StartTime, EndTime, WeekDay, Date))
      throw new HttpException("already scheduled", HttpStatus.BAD_REQUEST)
    try {
      const schedule = await this.prisma.doctorSchedule.create({
        data: {
          DoctorID,
          Date,
          WeekDay,          
          StartTime,
          EndTime,
          Note, }
      })
      console.log(schedule)
      return schedule
    } catch (error) {
      console.log(error)
      throw error
    }
  }


//
  async createEmergencySchedule(EmergencyScheduleInput: EmergencyScheduleInput) {
    const { DoctorID, EndTime } = EmergencyScheduleInput
    const scheduleDate = new Date(format(new Date().toDateString(),"yyy-MM-dd"))
    const StartTime = new Date()
    try {
      const isEndTimeOccupied=await this.prisma.doctorSchedule.findFirst({
        where:{  
          Status:"available",         
            EndTime:{
              equals:EndTime
            },
        }
      })
      console.log(isEndTimeOccupied)
      if(isEndTimeOccupied)
        throw new Error("already scheduled")
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

//
async updateEmergencySchedule(){
  const today=new Date()
   try {
    const schedules=await this.prisma.doctorSchedule.updateMany({
      where:{
        ScheduleType:"emergency",
        Date:today,
        EndTime:{
          lt:new Date()
        },
        Status:'available'
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
    try {
      const schedules = await this.prisma.doctorSchedule.findMany({
        where: {
          DoctorID,
          Status:"available"
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
    try {
      const emergencySchedules = await this.prisma.doctorSchedule.findMany({
        where: {
          ScheduleType: "emergency",
          Status:"available",
          EndTime:{
            gt:today
          }

          
        }
      })
      console.log(emergencySchedules)
      return emergencySchedules
    } catch (error) {
      throw error

    }
  }

  // 
  async  getScheduleByDate(Date:Date){
    try {
      const schedules=await this.prisma.doctorSchedule.findMany({
        where:{
          AND:[{
            Appointments:{
              some:{
                
              }
              
            }
          }]
         
        }
      })
      
    } catch (error) {
      
    }
  }



}
