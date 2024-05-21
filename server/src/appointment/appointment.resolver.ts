import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';

@Resolver('Appointment')
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Mutation('CreateAppointment')
  async createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    const input=new CreateAppointmentInput(createAppointmentInput)
    console.log(input)
  }


//
  @Query('UserAppointments')
  async findUserAppointments() {

  }
  //
   @Query('FilterAppoinments')
  async filterAppointments() {

  } 
  
  //
  @Query('GetAppointmentByID')
  getAppointment() {

  }


  @Mutation('UpdateAppointment')
  update(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
  }

  // @Mutation('removeAppointment')
  // remove(@Args('id') id: number) {
  //   return this.appointmentService.remove(id);
  // }
}
