import { Field, InputType } from "@nestjs/graphql";
import { ScheduleStatus, WeekDay } from "src/utils/types";
import { object, z } from "zod";

const WeekdayValue = Object.values(WeekDay) as [string, ...string[]]
const GenderValues = Object.values(ScheduleStatus) as [string, ...string[]]



const CreateScheduleSchema = z.object({
    DoctorID:z.string(),
    WeekDay: z.enum(WeekdayValue),
    Date: z.date().optional().refine(() => {

    }),
    StartTime: z.date().refine(() => {

    }),
    EndTime: z.date().refine(() => {

    }),
    Note: z.string().optional()

})


@InputType()
export class CreateScheduleInput {
    @Field()
    DoctorID:string
    @Field()
    WeekDay?: WeekDay
    @Field()
    Date?:Date
    @Field()
    StartTime:Date
    @Field()
    EndTime:Date
    @Field()
    Note?:string
}

@InputType()
export class EmergencyScheduleInput {
    @Field()
    DoctorID:string
    @Field()
    StartTime:Date
    @Field()
    EndTime:Date
    @Field()
    Note?:string
}
