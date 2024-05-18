import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';

@Resolver('Appointment')
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Mutation('createAppointment')
  create(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    return this.appointmentService.create(createAppointmentInput);
  }

  @Query('appointment')
  findAll() {
    return this.appointmentService.findAll();
  }

  @Query('appointment')
  findOne(@Args('id') id: number) {
    return this.appointmentService.findOne(id);
  }

  @Mutation('updateAppointment')
  update(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return this.appointmentService.update(updateAppointmentInput.id, updateAppointmentInput);
  }

  @Mutation('removeAppointment')
  remove(@Args('id') id: number) {
    return this.appointmentService.remove(id);
  }
}
