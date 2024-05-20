import { CreateScheduleInput } from './create-schedule.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  ScheduleID: string;
}
