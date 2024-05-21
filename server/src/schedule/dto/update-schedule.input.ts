import { CreateScheduleInput } from './create-schedule.input';
import { PartialType } from '@nestjs/mapped-types';

import { Weekday } from "@prisma/client";
import { format, parse } from "date-fns";
import { ScheduleStatus, WeekDay, } from "src/utils/types";
import { object, z } from "zod";
import { convertToIso } from "src/utils/converToIso"; // Import the convertToIso function
import { Schedule } from '../entities/schedule.entity';

const WeekdayValue = Object.values(Weekday) as [string, ...string[]];
const GenderValues = Object.values(ScheduleStatus) as [string, ...string[]];

const UpdateScheduleSchema = z.object({
  ScheduleID: z.string(),
  DoctorID: z.string(),
  WeekDay: z.enum(WeekdayValue).optional(),
  Date: z.string().optional(),
  StartTime: z.string().optional(),
  EndTime: z.string().optional(),
  Note: z.string().optional()
}).refine(({ Date: scheduleDate, WeekDay, StartTime, EndTime }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of the current day
  if (scheduleDate) {
    const date = new Date(scheduleDate);
    date.setHours(0, 0, 0, 0); // Set to the start of the scheduleDate
    if (date.getTime() < today.getTime()) {
      throw new Error('Scheduled date cannot be in the past');
    }
  }
  let startTime:Date
  let endTime:Date
  if(StartTime)
   startTime = new Date(convertToIso(StartTime)); // Convert and parse StartTime
  if(EndTime)
   endTime = new Date(convertToIso(EndTime)); // Convert and parse EndTime
  if (!WeekDay && !scheduleDate) {
    throw new Error("either weekday or date must be provided")
  }
  if (WeekDay && scheduleDate) {
    throw new Error("can't create schedule for both weekday and date at the same time")
  }
  if (endTime&&startTime&&(endTime.getTime() <= startTime.getTime())) throw new Error('End time must be after start time');
  if (endTime&&startTime&&((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) < 1)) throw new Error('Gap between start time and end time must be at least 1 hour');
  return true;
});


export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  ScheduleID: string;
  constructor(input: UpdateScheduleInput) {
    super()
    const validatedData = UpdateScheduleSchema.parse(input)
    this.ScheduleID=validatedData.ScheduleID
    this.DoctorID = validatedData.DoctorID;
    this.WeekDay = input.WeekDay
    this.Date = validatedData.Date ? new Date(validatedData.Date) : undefined;
    this.StartTime = validatedData.StartTime&&new Date(convertToIso(validatedData.StartTime)); // Convert and parse StartTime
    this.EndTime =validatedData.EndTime&&new Date(convertToIso(validatedData.EndTime)); // Convert and parse EndTime
    this.Note = validatedData.Note;
    console.log("come on man")
  }
}
