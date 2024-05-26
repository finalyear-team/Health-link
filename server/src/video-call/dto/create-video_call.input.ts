import { Field, InputType } from "@nestjs/graphql";
import { Weekday } from "@prisma/client";
import { format, parse } from "date-fns";
import { ScheduleStatus, WeekDay,  } from "src/utils/types";
import { object, z } from "zod";
import { convertToIso } from "src/utils/converToIso"; // Import the convertToIso function
import { parseDate } from "src/utils/parseDate";
import { HttpException, HttpStatus } from "@nestjs/common";



// Define CreateScheduleSchema
const createRoomSchema = z.object({
    RoomID: z.string().min(1,"RoomID is required"),
    RoomName:z.string().min(1,"RoomName is required"),
    HostID: z.string(),
    MemberID: z.string(),
    AppointmentDate: z.string(),
    AppointmentTime: z.string().optional()
}).refine(({AppointmentDate, AppointmentTime }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the current day
    if (AppointmentDate) {
        const date = new Date(parseDate(AppointmentDate));
        date.setHours(0, 0, 0, 0); // Set to the start of the scheduleDate
        if (date.getTime() < today.getTime()) {
            throw new HttpException('Appointment Date cannot be in the past',HttpStatus.BAD_REQUEST);  } }   
    return true;
});





@InputType()
export class CreateVideoCallRoomInput {
    RoomID:string
    RoomName:string
    HostID:string
    MemberID:string
    AppointmentDate:Date
    AppointmentTime:Date
   
    constructor(input: CreateVideoCallRoomInput) { 
        const validatedData = createRoomSchema.parse(input);
        console.log(validatedData)
        Object.assign(this,validatedData)
        this.AppointmentDate=validatedData.AppointmentDate&&new Date(format(parseDate(validatedData.AppointmentDate),"yyyy-MM-dd"))
        this.AppointmentTime=validatedData.AppointmentTime&&new Date(convertToIso(validatedData.AppointmentTime))

    }
}



