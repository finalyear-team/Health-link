import { Field, InputType } from "@nestjs/graphql";
import { ContentType } from "@prisma/client";
import { MediaType } from "src/utils/types";


@InputType()
export class ConfirmPaymentInput {
    @Field()
    AppointmentID: string
    @Field()
    PatientID: string
    @Field()
    DoctorID: string
    @Field()
    Duration: number
    @Field()
    Amount: number
}




