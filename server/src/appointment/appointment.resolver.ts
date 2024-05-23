import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment } from './entities/appointment.entity';

@Resolver('Appointment')
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

//
  @Mutation('CreateAppointment')
  async createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    console.log(createAppointmentInput)
    const input=new CreateAppointmentInput(createAppointmentInput)
    const appointment=await this.appointmentService.createAppointment(input) 
    return appointment
   }


//
  @Query('UserAppointments')
  async findUserAppointments(@Args("UserID") UserID:string) {
    const appointments=await this.appointmentService.getAppointments(UserID)
    return appointments
  }

  //
   @Query('FilterAppoinments')
  async filterAppointments() {

  } 
  
  //
  @Query('GetAppointmentByID')
  async getAppointment(@Args("Id") AppointmentID:string) {
     return await this.appointmentService.getAppointmentByID(AppointmentID)

  }

  //
  @Mutation('UpdateAppointment')
  async update(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    const input=new UpdateAppointmentInput(updateAppointmentInput)
    return await this.appointmentService.updateAppointment(input)
  }

  //
  //
  @Mutation('AcceptAppointment')
  async AcceptAppointment(@Args('DoctorID') DoctorID: string,@Args("AppointmentID") AppointmentID:string,@Args("Duration") Duration:number) {
    return await this.appointmentService.AcceptedAppointment(DoctorID,AppointmentID,Duration);
  }


  //
  @Mutation('RemoveAppointment')
  async remove(@Args('Id') AppointmentID: string) {
    return await this.appointmentService.remove(AppointmentID);
  }
}
