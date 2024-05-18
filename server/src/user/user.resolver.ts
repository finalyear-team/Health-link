import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ResetInput, UpdateUserInput } from './dto/update-user.input';
import { NextFunction, Request, Response, response } from 'express';
import { DoctorDetailInput, UserDetailsInput } from './dto/create-user.input';
import { RoleGuard, UserRoles } from 'src/access-control/role.guard';
import { SuspendType, UserType } from 'src/utils/types';
import { UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/auth.guard';
import { User } from '@clerk/clerk-sdk-node';
import { ClerkMiddleware } from 'src/clerk.middleware';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  lowerCase(field:string){
    return field.toLowerCase()  }

  
@Mutation('RegisterUser')
  async register(@Args('RegisterInput') RegisterInput:UserDetailsInput,@Context("res") res:Response ) {
     const FirstName=RegisterInput.FirstName.toLowerCase() 
     const LastName= RegisterInput.LastName.toLowerCase()
     const user=await this.userService.RegisterUser({FirstName,LastName,...RegisterInput});
     return user
  }  
  


 @Mutation('DoctorRegister')
 async doctorRegister(@Args('DoctorDetailInput') DoctorDetailInput:DoctorDetailInput){
  const {UserDetails,Speciality:DoctorSpeciality,...others}=DoctorDetailInput
  const FirstName=UserDetails.FirstName.toLowerCase()
  const LastName=UserDetails.LastName.toLowerCase()
  const Speciality=DoctorSpeciality.toLowerCase()
  const userDetails={...UserDetails,FirstName,LastName}
  const doctor=await this.userService.DoctorRegister({ UserDetails,Speciality,...others })
  console.log(doctor)
  return doctor
 }

  
  @Query('GetUsers')
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async findAll(@Context() context:{req:Request,res:Response,next:NextFunction }) {   
    const Users=await this.userService.getUsers()
    return Users
  }
  
  

  @Query('GetUser')
  async findOne(@Args('id') id: string) {
    const User=await this.userService.getUserDetails(id)
    return User
  }


  @Query('SearchUsers')
  async searchUsers(@Args('searchQuery') searchQuery:string){
    console.log(searchQuery)  
   
    const users=await this.userService.searchUsers(searchQuery)    
    console.log(users)
    return users
  }
  
  @Query('SearchDoctors')
  async searchDoctors(@Args('searchQuery') searchQuery:string){
    console.log(searchQuery)      
    const users=await this.userService.searchDoctors(searchQuery)    
    console.log(users)
    return users
  }



  @Mutation('UpdateUser')
  //  @UseGuards(ClerkAuthGuard)
 async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {  
    const user=await this.userService.updateUser(updateUserInput)
    console.log()
    const Education=JSON.parse(`${user.EducationalBackground}`)
    console.log(Education)
    return {EducationalBackground:Education,...user}
    
  }

  @Mutation('SuspendUser')
  //  @UseGuards(ClerkAuthGuard)
 async SuspendUser(@Args('id') UserID: string,@Args("suspendType") suspendType:SuspendType) {  
    const user=await this.userService.suspendUser(UserID,suspendType)   
    return user
    
  }


 
  @Mutation('RemoveUser')
  RemoveUser(@Args('id') id: number) {
  }
}
