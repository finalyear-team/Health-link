import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorReviewInput } from './create-doctor-review.input';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDoctorReviewInput extends PartialType(CreateDoctorReviewInput) {
  ReviewID: string;
}
