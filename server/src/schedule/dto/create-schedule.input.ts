import { Field, InputType } from "@nestjs/graphql";
import { ScheduleType, Weekday } from "@prisma/client";
import { format, parse } from "date-fns";
import { ScheduleStatus, WeekDay, } from "src/utils/types";
import { object, z } from "zod";
import { convertToIso } from "src/utils/converToIso"; // Import the convertToIso function
import { parseDate } from "src/utils/parseDate";

const WeekdayValue = Object.values(Weekday) as [string, ...string[]];
const StatusValue = Object.values(ScheduleStatus) as [string, ...string[]];
const SchedultTypeValue = Object.values(ScheduleType) as [string, ...string[]];

// Define CreateScheduleSchema
const CreateScheduleSchema = z.object({
    DoctorID: z.string(),
    WeekDay: z.enum(WeekdayValue).array().optional(),
    Date: z.string().optional(),
    StartTime: z.string(),
    EndTime: z.string(),
    Note: z.string().optional(),
    Status: z.enum(StatusValue).optional(),
    ScheduleType: z.enum(SchedultTypeValue).optional()
}).refine(({ Date: scheduleDate, WeekDay, StartTime, EndTime }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the current day
    if (scheduleDate) {
        const date = new Date(format(parseDate(scheduleDate), "yyyy-MM-dd"));
        date.setHours(0, 0, 0, 0); // Set to the start of the scheduleDate
        if (date.getTime() < today.getTime()) {
            throw new Error('Scheduled date cannot be in the past');
        }
    }

    const startTime = new Date(convertToIso(StartTime));   // Convert and parse StartTime
    const endTime = new Date(convertToIso(EndTime));      // Convert and parse EndTime

    if (!WeekDay && !scheduleDate) {
        throw new Error("either weekday or date must be provided")
    }
    if (endTime.getTime() <= startTime.getTime()) throw new Error('End time must be after start time');
    if ((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) < 1) throw new Error('Gap between start time and end time must be at least 1 hour');
    return true;
});


const EmergencyScheduleInputSchema = z.object({
    DoctorID: z.string(),
    EndTime: z.string()
}).refine(({ EndTime }) => {
    const endTime = new Date(convertToIso(EndTime))
    if (endTime.getTime() <= new Date().getTime())
        throw new Error("End time must be after start time")
    if ((endTime.getTime() - new Date().getTime()) / (1000 * 60 * 60) < 1) throw new Error('Gap between start time and end time must be at least 1 hour');
    return true
})


@InputType()
export class CreateScheduleInput {
    @Field()
    DoctorID: string;
    @Field()
    WeekDay?: Weekday[];
    @Field()
    Date?: Date;
    @Field()
    StartTime: Date;
    @Field()
    EndTime: Date;
    @Field()
    Note?: string;
    @Field()
    Status?: ScheduleStatus;
    @Field()
    ScheduleType?: ScheduleType
    constructor(input: CreateScheduleInput) {
        const validatedData = CreateScheduleSchema.parse(input);
        Object.assign(this, validatedData)
        this.Date = validatedData.Date ? new Date(format(parseDate(validatedData.Date), "yyyy-MM-dd")) : undefined;
        this.StartTime = new Date(convertToIso(validatedData.StartTime)); // Convert and parse StartTime
        this.EndTime = new Date(convertToIso(validatedData.EndTime)); // Convert and parse EndTime
    }
}



@InputType()
export class EmergencyScheduleInput {
    @Field()
    DoctorID: string
    @Field()
    EndTime: Date
    constructor(input: EmergencyScheduleInput) {
        const validatedData = EmergencyScheduleInputSchema.parse(input);
        this.DoctorID = validatedData.DoctorID;
        this.EndTime = new Date(convertToIso(validatedData.EndTime)); // Convert and parse EndTime
    }
}
