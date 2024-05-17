import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import {  UserDetailsInput } from './create-user.input';


export class UpdateUserInput extends PartialType(UserDetailsInput) {
  id: number;
}

@InputType()
export class ResetInput{ 
    @Field()
    Id:string
    @Field()
    newPassword:string

}