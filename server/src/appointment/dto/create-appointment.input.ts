import { Field, InputType } from "@nestjs/graphql";
import { AppointmentStatus, AppointmentType } from "@prisma/client";
import { format, parse, isBefore, startOfDay, formatDate, differenceInDays } from "date-fns";
import { ScheduleStatus, WeekDay } from "src/utils/types";
import { z } from "zod";
import { compareTimeOnly, convertToIso } from "src/utils/converToIso";
import { parseDate } from "src/utils/parseDate";


const StatusValue = Object.values(AppointmentStatus) as [string, ...string[]];
const TypeValue = Object.values(AppointmentType) as [string, ...string[]];

// Define the CreateAppointmentInput Zod schema
export const createAppointmentSchema = z.object({
    DoctorID: z.string(),
    PatientID: z.string(),
    ScheduleID: z.string().min(1, "scheduleID is required"),
    AppointmentDate: z.string(),
    AppointmentTime: z.string(),
    Duration: z.number().optional(),
    VideoChatRoomID: z.string().optional(),
    Status: z.enum(StatusValue).optional(),
    AppointmentType: z.enum(TypeValue).optional(),
    Note: z.string().optional(),
}).refine(({ AppointmentDate, AppointmentTime }) => {
    try {
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


@InputType()
export class CreateAppointmentInput {
    @Field()
    DoctorID: string;

    @Field()
    PatientID: string;

    @Field()
    ScheduleID: string;

    @Field()
    AppointmentDate: Date;

    @Field()
    AppointmentTime: Date;

    @Field({ nullable: true })
    Duration?: number;

    @Field({ nullable: true })
    VideoChatRoomID?: string;

    @Field(() => AppointmentStatus, { nullable: true })
    Status?: AppointmentStatus;

    @Field(() => AppointmentType, { nullable: true })
    AppointmentType?: AppointmentType;

    @Field({ nullable: true })
    Note?: string;

    constructor(input: CreateAppointmentInput) {
        const validatedAppointment = createAppointmentSchema.parse(input); // Validate input with Zod schema
        Object.assign(this, validatedAppointment)
        this.AppointmentDate = new Date(validatedAppointment.AppointmentDate)
        this.AppointmentTime = new Date(convertToIso(validatedAppointment.AppointmentTime))
    }
}





const createEmergencyAppointmentSchema = z.object({
    DoctorID: z.string(),
    PatientID: z.string(),
    ScheduleID: z.string().min(1, "scheduleID is required"),
    AppointmentTime: z.string().refine(time => {
        const appointmentTime = new Date(convertToIso(time));
        if (appointmentTime.getTime() <= new Date().getTime())
            throw new Error("Appointment time can't be in the past")

    }),
    Note: z.string().optional()

});


@InputType()
export class createEmergencyAppointmentInput {

    @Field()
    DoctorID: string;

    @Field()
    PatientID: string;

    @Field()
    ScheduleID: string;

    @Field()
    AppointmentTime: Date;

    @Field({ nullable: true })
    Duration?: number;

    @Field({ nullable: true })
    Note?: string;

    constructor(input: createEmergencyAppointmentInput) {
        const validatedAppointment = createAppointmentSchema.parse(input); // Validate input with Zod schema
        Object.assign(this, validatedAppointment)
        this.AppointmentTime = new Date(convertToIso(validatedAppointment.AppointmentTime))
    }

}

