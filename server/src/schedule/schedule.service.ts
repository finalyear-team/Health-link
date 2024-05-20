import { Injectable } from '@nestjs/common';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma:PrismaService){}

  async createSchedule(createScheduleInput:CreateScheduleInput){
    try {
      const schedule=await this.prisma.doctorSchedule.create({
          data:{
            DoctorID:{
              
            },
            ...createScheduleInput 
            
          }
      })
      console.log(schedule)
      return schedule
    } catch (error) {
      console.log(error)
      throw error      
    }
  }
 
 
  async  createEmergencySchedule(EmergencyScheduleInput:EmergencyScheduleInput){
    try {
     
    
       
    } catch (error) {
      
    }

  }

  async updateSchedule(updateScheduleInput:UpdateScheduleInput){
    console.log(updateScheduleInput)
    try {
       
    } catch (error) {
      console.log(error)
      throw error
      
    }

  }
}
