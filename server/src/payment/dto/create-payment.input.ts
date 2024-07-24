import { Field, InputType } from "@nestjs/graphql";
import { ContentType } from "@prisma/client";
import { MediaType } from "src/utils/types";


@InputType()
export class CreatePaymentInput {
    @Field()
    PatientID: string
    @Field()
    DoctorID: string
    @Field()
    AppointmentID: string
    @Field()
    Amount: number
    @Field()
    Duration: number
}




