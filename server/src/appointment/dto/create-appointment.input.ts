import { Field, InputType } from "@nestjs/graphql";
import { AppointmentStatus, AppointmentType } from "@prisma/client";
import { format, parse, isBefore, startOfDay, formatDate } from "date-fns";
import { ScheduleStatus, WeekDay } from "src/utils/types";
import { z } from "zod";
import { convertToIso } from "src/utils/converToIso";
import { parseDate } from "src/utils/parseDate";


const StatusValue = Object.values(AppointmentStatus) as [string, ...string[]];
const TypeValue = Object.values(AppointmentType) as [string, ...string[]];

// Define the CreateAppointmentInput Zod schema
export const createAppointmentSchema = z.object({
    DoctorID: z.string(),
    PatientID: z.string(),
    ScheduleID: z.string().min(1, "scheduleID is required"),
    AppointmentDate: z.string().refine(date => {
        const today = new Date();
        const parsedDate = parseDate(date)
        today.setHours(0, 0, 0, 0); // Set to the start of the current day
        if (date) {
            const appointmentDate = new Date(parsedDate);
            appointmentDate.setHours(0, 0, 0, 0); // Set to the start of the scheduleDate
            if (appointmentDate.getTime() < today.getTime()) {
                throw new Error('Scheduled date cannot be in the past');
            }
            else return true;
        }
    }),
    AppointmentTime: z.string().refine(time => {
        try {
            convertToIso(time);
            return true;
        } catch (e) {
            return false;
        }
    }, {
        message: "Invalid AppointmentTime format"
    }),
    Duration: z.number().optional(),
    VideoChatRoomID: z.string().optional(),
    Status: z.enum(StatusValue).optional(),
    AppointmentType: z.enum(TypeValue).optional(),
    Note: z.string().optional(),
});


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
        console.log(this.AppointmentTime)
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

