import { CreateForumAnswerInput, CreateForumInput } from './create-forum.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateForumInput extends PartialType(CreateForumInput) {
  ForumID: string;
}

export class UpdateForumAnswerInput extends PartialType(CreateForumAnswerInput) {
  ForumAnswerID: string;
}