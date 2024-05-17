import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ResetInput, UpdateUserInput } from './dto/update-user.input';
import { NextFunction, Request, Response, response } from 'express';
import { DoctorDetailInput, UserDetailsInput } from './dto/create-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  
@Mutation('RegisterUser')
  async register(@Args('RegisterInput') RegisterInput:UserDetailsInput,@Context("res") res:Response ) {
     const user=await this.userService.RegisterUser(RegisterInput);
     return user
  }  
  

 @Mutation('DoctorRegister')
 async doctorRegister(@Args('DoctorDetailInput') DoctorDetailInput:DoctorDetailInput,@Context("res") res:Response){
  console.log("one")
  const doctor=await this.userService.DoctorRegister(DoctorDetailInput)
  return doctor
 }


  
  @Query('users')
  findAll(@Context() context:any) {    
  }
  
  @Query('user')
  findOne(@Args('id') id: number,@Context() Context:{req:Request,res:Response,next:NextFunction}) {
  }

  // @Mutation('updateUser')
  // update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  // }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
  }
}
