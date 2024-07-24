import { CreateAppointmentInput, createAppointmentSchema } from './create-appointment.input';
import { PartialType } from '@nestjs/mapped-types';
import { $Enums, AppointmentStatus, AppointmentType } from '@prisma/client';
import { differenceInDays, format } from 'date-fns';
import { parseDate } from 'src/utils/parseDate';
import { UpdateAppointmentType } from 'src/utils/types';
import { z } from "zod";
import { compareTimeOnly, convertToIso } from "src/utils/converToIso";


const StatusValue = Object.values(AppointmentStatus) as [string, ...string[]];
const TypeValue = Object.values(AppointmentType) as [string, ...string[]];

// Define the CreateAppointmentInput Zod schema
export const updateSchema = z.object({
  DoctorID: z.string(),
  PatientID: z.string(),
  ScheduleID: z.string().min(1, "scheduleID is required").optional(),
  AppointmentDate: z.string().optional(),
  AppointmentTime: z.string().optional(),
  Duration: z.number().optional(),
  VideoChatRoomID: z.string().optional(),
  Status: z.enum(StatusValue).optional(),
  AppointmentType: z.enum(TypeValue).optional(),
  Note: z.string().optional(),
}).refine(({ AppointmentDate, AppointmentTime }) => {
  try {
    if (!AppointmentDate && !AppointmentTime)
      return true
    const now = new Date()
    const currenttime = convertToIso(AppointmentTime);
    if (differenceInDays(new Date(format(AppointmentDate, "yyyy-MM-dd")), new Date(format(now, "yyyy-MM-dd"))) < 0)
      return false

    if (differenceInDays(new Date(format(AppointmentDate, "yyyy-MM-dd")), new Date(format(now, "yyyy-MM-dd"))) === 0 && compareTimeOnly(currenttime, new Date()) < 0)
      return false
    return true;
  } catch (e) {
    return false;
  }

}, "Appointment can't be in the past");


export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  AppointmentID: string;
  CancelledBy?: string
  CancelledReason?: string
  UpdatedBy?: string
  ScheduleID?: string;
  AppointmentDate?: Date;
  AppointmentTime?: Date;
  AppointmentType?: $Enums.AppointmentType;
  updateType?: UpdateAppointmentType

  constructor(input: UpdateAppointmentInput) {
    super(input)
    const validatedAppointment = updateSchema.parse(input)
    Object.assign(this, input)
    console.log(this.AppointmentDate)
    Object.assign(this, validatedAppointment)
    this.AppointmentDate = this.AppointmentDate && new Date(format(parseDate(validatedAppointment.AppointmentDate), "yyyy-MM-dd"))
    this.AppointmentTime = this.AppointmentDate && new Date(convertToIso(validatedAppointment.AppointmentTime))
    console.log("from validation")
    console.log(this.AppointmentDate)
  }

}
