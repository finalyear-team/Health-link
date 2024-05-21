import { Field, InputType } from "@nestjs/graphql";
import { Weekday } from "@prisma/client";
import { format, parse } from "date-fns";
import { ScheduleStatus, WeekDay,  } from "src/utils/types";
import { object, z } from "zod";
import { convertToIso } from "src/utils/converToIso"; // Import the convertToIso function

const WeekdayValue = Object.values(Weekday) as [string, ...string[]];
const GenderValues = Object.values(ScheduleStatus) as [string, ...string[]];

// Define CreateScheduleSchema
const CreateScheduleSchema = z.object({
    DoctorID: z.string(),
    WeekDay: z.enum(WeekdayValue).optional(),
    Date: z.string().optional(),
    StartTime: z.string(),
    EndTime: z.string(),
    Note: z.string().optional()
}).refine(({Date:scheduleDate, WeekDay,StartTime, EndTime }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the current day
    if (scheduleDate) {
        const date = new Date(scheduleDate);
        date.setHours(0, 0, 0, 0); // Set to the start of the scheduleDate
        if (date.getTime() < today.getTime()) {
            throw new Error('Scheduled date cannot be in the past');  } }
    const startTime = new Date(convertToIso(StartTime)); // Convert and parse StartTime
    const endTime = new Date(convertToIso(EndTime)); // Convert and parse EndTime
    if(!WeekDay && !scheduleDate){
       throw new Error("either weekday or date must be provided")}
    if(WeekDay && scheduleDate){
        throw new Error("can't create schedule for both weekday and date at the same time")}
    if (endTime.getTime() <= startTime.getTime()) throw new Error('End time must be after start time');
    if ((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) < 1) throw new Error('Gap between start time and end time must be at least 1 hour');
    return true;
});


const EmergencyScheduleInputSchema=z.object({
    DoctorID:z.string(),
    EndTime:z.string()}).refine(({EndTime})=>{
        const endTime=new Date(convertToIso(EndTime))
        if(endTime.getTime()<=new Date().getTime())
             throw new Error("End time must be after start time")
        if ((endTime.getTime() - new Date().getTime()) / (1000 * 60 * 60) < 1) throw new Error('Gap between start time and end time must be at least 1 hour');
        return true      
})


@InputType()
export class CreateScheduleInput {
    @Field()
    DoctorID: string;
    @Field()
    WeekDay?: Weekday;
    @Field()
    Date?: Date;
    @Field()
    StartTime: Date;
    @Field()
    EndTime: Date;
    @Field()
    Note?: string;
    constructor(input: CreateScheduleInput) { 
        const validatedData = CreateScheduleSchema.parse(input);
        this.DoctorID = validatedData.DoctorID;
        this.WeekDay=input.WeekDay
        this.Date = validatedData.Date ? new Date(validatedData.Date) : undefined;
        this.StartTime = new Date(convertToIso(validatedData.StartTime)); // Convert and parse StartTime
        this.EndTime = new Date(convertToIso(validatedData.EndTime)); // Convert and parse EndTime
        this.Note = validatedData.Note;
    }
}



@InputType()
export class EmergencyScheduleInput {
    @Field()
    DoctorID:string 
    @Field()
    EndTime:Date
    constructor(input: EmergencyScheduleInput) {               
        const validatedData = EmergencyScheduleInputSchema.parse(input);
        this.DoctorID = validatedData.DoctorID;
        this.EndTime = new Date(convertToIso(validatedData.EndTime)); // Convert and parse EndTime
    }
}
