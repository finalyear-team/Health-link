import { CreateAppointmentInput, createAppointmentSchema } from './create-appointment.input';
import { PartialType } from '@nestjs/mapped-types';
import { format } from 'date-fns';
import { convertToIso } from 'src/utils/converToIso';
import { parseDate } from 'src/utils/parseDate';
import {object, z} from "zod"


export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  AppointmentID: string;
  CancelledBy?:string
  cancelReason?:string 
  
  constructor(input:UpdateAppointmentInput){
    super(input)
    const validatedAppointment=createAppointmentSchema.parse(input)
    Object.assign(this,input)
     Object.assign(this,validatedAppointment)
     this.AppointmentDate=this.AppointmentDate&&new Date(format(parseDate(validatedAppointment.AppointmentDate),"yyyy-MM-dd"))
     this.AppointmentTime=this.AppointmentDate&&new Date(convertToIso(validatedAppointment.AppointmentTime))

  }


  
}
