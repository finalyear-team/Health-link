import { Field, InputType } from "@nestjs/graphql";
import { AppointmentStatus, AppointmentType } from "@prisma/client";
import { format, parse, isBefore, startOfDay } from "date-fns";
import { ScheduleStatus, WeekDay } from "src/utils/types";
import { z } from "zod";
import { convertToIso } from "src/utils/converToIso";


const StatusValue = Object.values(AppointmentStatus) as [string, ...string[]];
const TypeValue = Object.values(AppointmentType) as [string, ...string[]];

// Define the CreateAppointmentInput Zod schema
const createAppointmentSchema = z.object({
    DoctorID: z.string(),
    PatientID: z.string(),
    ScheduleID: z.string(),
    AppointmentDate: z.string().refine(date => {
        const appointmentDate = parse(date, "yyyy-MM-dd", new Date());
        const today = startOfDay(new Date());
        return !isBefore(appointmentDate, today);
    }, {
        message: "AppointmentDate can't be in the past"
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

    @Field(() => AppointmentStatus, { nullable: true })
    Status?: AppointmentStatus;

    @Field(() => AppointmentType, { nullable: true })
    AppointmentType?: AppointmentType;

    @Field({ nullable: true })
    Note?: string;

    constructor(input: CreateAppointmentInput) {
        const validatedAppointment = createAppointmentSchema.parse(input); // Validate input with Zod schema
        this.AppointmentDate = new Date(validatedAppointment.AppointmentDate)
        this.AppointmentTime = new Date(convertToIso(validatedAppointment.AppointmentTime))
    }
}

