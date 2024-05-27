import { CreateForumInput } from './create-forum.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateForumInput extends PartialType(CreateForumInput) {
  id: number;
}
