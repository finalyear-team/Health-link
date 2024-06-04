import { CreateStreamInput } from './create-stream.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateStreamInput extends PartialType(CreateStreamInput) {
  id: number;
}
