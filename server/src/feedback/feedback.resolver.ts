import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { UpdateFeedbackInput } from './dto/update-feedback.input';

@Resolver('Feedback')
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Mutation('CreateFeedback')
  create(@Args('createFeedbackInput') createFeedbackInput: CreateFeedbackInput) {
    return this.feedbackService.create(createFeedbackInput);
  }

  @Query('Feedback')
  findAll() {
    return this.feedbackService.findAll();
  }

  @Query('Feedback')
  findOne(@Args('id') id: number) {
    return this.feedbackService.findOne(id);
  }

  @Mutation('UpdateFeedback')
  update(@Args('updateFeedbackInput') updateFeedbackInput: UpdateFeedbackInput) {
    console.log("first")
    return this.feedbackService.update(updateFeedbackInput.id, updateFeedbackInput);
  }

  @Mutation('RemoveFeedback')
  remove(@Args('id') id: number) {
    return this.feedbackService.remove(id);
  }
}
