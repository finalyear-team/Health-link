import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment } from './entities/appointment.entity';
import { User } from '@clerk/clerk-sdk-node';
import { query } from 'express';
import { UserService } from 'src/user/user.service';
import { AppointmentStatus } from '@prisma/client';

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
    console.log(UserID)
    const appointments = await this.appointmentService.getAppointments(UserID)
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
  @Query('checkIfOverDue')
  async checkOverDueAppointment() {
    return await this.appointmentService.updateAppointmentStatus()

  }

  //
  @Mutation('UpdateAppointment')
  async update(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    const input = new UpdateAppointmentInput(updateAppointmentInput)
    console.log(input)
    return await this.appointmentService.updateAppointment(input)
  }

  //
  //
  @Mutation('AcceptAppointment')
  async AcceptAppointment(@Args('DoctorID') DoctorID: string, @Args("AppointmentID") AppointmentID: string, @Args("Duration") Duration: number, @Args("Status") Status: AppointmentStatus) {

    console.log(AppointmentID)
    return await this.appointmentService.AcceptAppointment(DoctorID, AppointmentID, Duration, Status);
  }

  //

  @Mutation('DeclineAppointment')
  async DeclineAppointment(@Args('CancelledBy') CancelledBy: string, @Args("AppointmentID") AppointmentID: string, @Args("CancelledReason") Reason: string) {
    const appointment = await this.appointmentService.declineAppointment(CancelledBy, AppointmentID, Reason)
    return appointment
  }


  //
  @Mutation('RemoveAppointment')
  async remove(@Args('Id') AppointmentID: string) {
    return await this.appointmentService.remove(AppointmentID);
  }
}
