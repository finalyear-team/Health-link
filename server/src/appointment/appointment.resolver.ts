import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment } from './entities/appointment.entity';
import { User } from '@clerk/clerk-sdk-node';
import { query } from 'express';

@Resolver('Appointment')
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) { }

  //
  @Mutation('CreateAppointment')
  async createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    const input = new CreateAppointmentInput(createAppointmentInput)
    const appointment = await this.appointmentService.createAppointment(input)
    return appointment
  }


  //
  @Query('UserAppointments')
  async findUserAppointments(@Args("UserID") UserID: string) {
    const appointments = await this.appointmentService.getAppointments(UserID)
    console.log(appointments)
    return appointments
  }

  //
  @Query('FilterAppointments')
  async filterAppointments(@Args("Query") Query: string) {
    const appointments = await this.appointmentService.filterAppointments(Query)
    return appointments

  }

  @Query('FilterUserAppointment')
  async filterUserAppointments(@Args("UserID") UserID: string, @Args("Query") Query: string) {
    const appointments = await this.appointmentService.filterUserAppointments(UserID, Query)
    return appointments

  }

  @Query("FilterDoctorAppointment")
  async fitlerDoctorAppointments(@Args("DoctorID") DoctorID: string, @Args("Query") Query: string) {
    const appointments = await this.appointmentService.filterDoctorAppointments(DoctorID, Query)
    return appointments

  }


  //
  @Query('GetAppointmentByID')
  async getAppointment(@Args("Id") AppointmentID: string) {
    return await this.appointmentService.getAppointmentByID(AppointmentID)

  }

  //
  @Mutation('UpdateAppointment')
  async update(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    const input = new UpdateAppointmentInput(updateAppointmentInput)
    return await this.appointmentService.updateAppointment(input)
  }

  //
  //
  @Mutation('AcceptAppointment')
  async AcceptAppointment(@Args('DoctorID') DoctorID: string, @Args("AppointmentID") AppointmentID: string, @Args("Duration") Duration: number) {

    return await this.appointmentService.AcceptAppointment(DoctorID, AppointmentID, Duration);
  }


  //
  @Mutation('RemoveAppointment')
  async remove(@Args('Id') AppointmentID: string) {
    return await this.appointmentService.remove(AppointmentID);
  }
}
