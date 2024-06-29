import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ResetInput, UpdateUserInput } from './dto/update-user.input';
import { NextFunction, Request, Response, response } from 'express';
import { DoctorDetailInput, UserDetailsInput } from './dto/create-user.input';
import { RoleGuard, UserRoles } from 'src/access-control/role.guard';
import { SuspendType, UserType } from 'src/utils/types';
import { UseGuards } from '@nestjs/common';
import { ClerkAuthGuard, JWTGuard } from 'src/auth/auth.guard';
import { User } from '@clerk/clerk-sdk-node';
import { ClerkMiddleware } from 'src/clerk.middleware';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  lowerCase(field: string) {
    return field.toLowerCase()
  }

  @UseGuards(JWTGuard)
  @Query("GetSignedInUser")
  async getProfile(@Context() context: { req: Request, res: Response, next: NextFunction }) {
    console.log("user profile searc")
    const requestUser = context.req.user as any

    const user = await this.userService.getUserDetails(requestUser.UserID)

    return user
  }


  @Query("GetUserByEmail")
  async getUserByEmail(@Args("Email") Email: string) {
    const user = await this.userService.getUserByEmail(Email)
    console.log(user)
    return user
  }


  @Mutation('RegisterUser')
  async register(@Args('RegisterInput') RegisterInput: UserDetailsInput, @Context("res") res: Response) {
    console.log(RegisterInput)
    console.log("register")
    const input = new UserDetailsInput(RegisterInput)
    const user = await this.userService.RegisterUser(input);
    return user
  }



  @Mutation('DoctorRegister')
  async doctorRegister(@Args('DoctorDetailInput') doctorDetailInput: DoctorDetailInput) {
    const input = new DoctorDetailInput(doctorDetailInput)
    console.log(input)
    const doctor = await this.userService.DoctorRegister(input)
    return doctor
  }

  @Query("GetDoctors")
  async findDoctors() {
    const doctors = await this.userService.getDoctors()
    return doctors
  }
  @Query('GetUsers')
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async findAll(@Context() context: { req: Request, res: Response, next: NextFunction }) {
    const Users = await this.userService.getUsers()
    return Users
  }



  @Query('GetUser')
  async findOne(@Args('UserID') UserID: string) {
    const User = await this.userService.getUserDetails(UserID)
    return User
  }

  @Query('GetUser')
  async GetFollowers(@Args('UserID') UserID: string) {
    const User = await this.userService.getFollowers(UserID)
    return User
  }

  @Query('GetUser')
  async GetFollowing(@Args('UserID') UserID: string) {
    const User = await this.userService.getFollowing(UserID)
    return User
  }


  @Query('SearchUsers')
  async searchUsers(@Args('searchQuery') searchQuery: string) {
    const users = await this.userService.searchUsers(searchQuery)
    return users
  }

  @Query('SearchDoctors')
  async searchDoctors(@Args('searchQuery') searchQuery: string) {
    const users = await this.userService.searchDoctors(searchQuery)
    return users
  }



  @Mutation('UpdateUser')
  //  @UseGuards(ClerkAuthGuard)
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = await this.userService.updateUser(updateUserInput)
    const Education = JSON.parse(`${user.EducationalBackground}`)
    return { EducationalBackground: Education, ...user }

  }

  @Mutation('SuspendUser')
  //  @UseGuards(ClerkAuthGuard)
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async SuspendUser(@Args('UserID') UserID: string, @Args("suspendType") suspendType: SuspendType) {
    const user = await this.userService.suspendUser(UserID, suspendType)
    return user

  }

  @Mutation('Follow')
  //  @UseGuards(ClerkAuthGuard)
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async Follow(@Args('FollowerID') FollowerID: string, @Args("FollowingID") FollowingID: string) {
    const user = await this.userService.follow(FollowerID, FollowingID)
    return user

  }

  @Mutation('UnFollow')
  //  @UseGuards(ClerkAuthGuard)
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async UnFollow(@Args('FollowerID') FollowerID: string, @Args("FollowingID") FollowingID: string) {
    const user = await this.userService.unfollow(FollowerID, FollowingID)
    return user

  }


  @Mutation('RemoveUser')
  RemoveUser(@Args('UserID') UserID: string) {
  }
}
