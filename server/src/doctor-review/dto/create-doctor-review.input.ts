import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateDoctorReviewInput {
  @Field()
  DoctorID: string;

  @Field()
  ReviewerID: string;

  @Field(type => Int)
  Rating: number;

  @Field({ nullable: true })
  ReviewText?: string;
}
