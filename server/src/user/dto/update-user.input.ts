import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: number;
}

@InputType()
export class ResetInput{ 
    @Field()
    Id:string
    @Field()
    newPassword:string


}