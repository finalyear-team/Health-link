import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma:PrismaService){}

  
  async createAppointment(createAppointmentInput: CreateAppointmentInput) {
    console.log(createAppointmentInput)

    // try {
    //    const Appointment=await this.prisma.appointments.create({  
    //       data:{
    //        VideoChatRoom:{
    //         create:{


    //         }
    //        }
    //       }

    //    })

    // } catch (error) {
    //   throw error
    // }
    
    // return 'This action adds a new appointent';
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
