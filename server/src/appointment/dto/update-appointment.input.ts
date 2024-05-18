import { CreateAppointmentInput } from './create-appointment.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  id: number;
}
