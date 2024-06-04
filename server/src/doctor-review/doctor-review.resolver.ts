import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DoctorReviewService } from './doctor-review.service';
import { CreateDoctorReviewInput } from './dto/create-doctor-review.input';
import { UpdateDoctorReviewInput } from './dto/update-doctor-review.input';

@Resolver('DoctorReview')
export class DoctorReviewResolver {
  constructor(private readonly doctorReviewService: DoctorReviewService) {}

  @Mutation('CreateDoctorReview')
  create(@Args('createDoctorReviewInput') createDoctorReviewInput: CreateDoctorReviewInput) {
    return this.doctorReviewService.create(createDoctorReviewInput);
  }

  @Query('GetReviews')
  getReviews(@Args("DoctorID") DoctorID:string) {
    return this.doctorReviewService.getDoctorReviews(DoctorID);
  }

  @Query('GetReview')
  getReview(@Args('ReviewID') ReviewID: string) {
    return this.doctorReviewService.getReview(ReviewID);
  }

  @Mutation('UpdateDoctorReview')
  update(@Args('updateDoctorReviewInput') updateDoctorReviewInput: UpdateDoctorReviewInput) {
    return this.doctorReviewService.update(updateDoctorReviewInput.ReviewID, updateDoctorReviewInput);
  }

  @Mutation('RemoveDoctorReview')
  remove(@Args('ReviewID') ReviewID: string) {
    return this.doctorReviewService.removeReview(ReviewID);
  }
}
