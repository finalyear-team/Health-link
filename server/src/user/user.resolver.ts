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
    return field.toLowerCase();
  }

  @UseGuards(JWTGuard)
  @Query('GetSignedInUser')
  async getProfile(
    @Context() context: { req: Request; res: Response; next: NextFunction },
  ) {
    const requestUser = context.req.user as any;
    const user = await this.userService.getUserDetails(requestUser.UserID);

    return user;
  }

  @Query('GetUserByEmail')
  async getUserByEmail(@Args('Email') Email: string) {
    const user = await this.userService.getUserByEmail(Email);
    console.log(user);
    return user;
  }

  @Mutation('RegisterUser')
  async register(
    @Args('RegisterInput') RegisterInput: UserDetailsInput,
    @Context('res') res: Response,
  ) {
    console.log(RegisterInput);
    console.log('register');
    const input = new UserDetailsInput(RegisterInput);
    const user = await this.userService.RegisterUser(input);
    return user;
  }

  @Mutation('DoctorRegister')
  async doctorRegister(
    @Args('DoctorDetailInput') doctorDetailInput: DoctorDetailInput,
  ) {
    const input = new DoctorDetailInput(doctorDetailInput);
    console.log(input);
    const doctor = await this.userService.DoctorRegister(input);
    return doctor;
  }

  @Query('GetDoctors')
  async findDoctors() {
    const doctors = await this.userService.getDoctors();
    return doctors;
  }
  @Query('GetUsers')
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async findAll(
    @Context() context: { req: Request; res: Response; next: NextFunction },
  ) {
    const Users = await this.userService.getUsers();
    return Users;
  }

  @Query('GetUser')
  async findOne(@Args('UserID') UserID: string) {
    console.log(UserID)
    console.log("lskdjf")
    const User = await this.userService.getUserDetails(UserID);
    console.log("first")
    console.log(User)
    return User;
  }

  @Query('GetFollowers')
  async GetFollowers(@Args('UserID') UserID: string) {
    const User = await this.userService.getFollowers(UserID);
    return User;
  }

  @Query('GetFollowing')
  async GetFollowing(@Args('UserID') UserID: string) {
    const User = await this.userService.getFollowing(UserID);
    return User;
  }

  @Mutation('SearchUsers')
  async searchUsers(@Args('searchQuery') searchQuery: string) {
    const users = await this.userService.searchUsers(searchQuery);
    return users;
  }

  @Mutation('SearchDoctors')
  async searchDoctors(
    @Args('searchQuery') searchQuery: string,
    @Args('sortingQuery') sortingQuery: string,
    @Args('sortingOrder') sortingOrder: string,
  ) {
    console.log(searchQuery);
    console.log(sortingOrder);
    console.log(sortingQuery);

    const users = await this.userService.searchDoctors(
      searchQuery,
      sortingQuery,
      sortingOrder,
    );
    return users;
  }

  @Mutation('UpdateUser')
  //  @UseGuards(ClerkAuthGuard)
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = await this.userService.updateUser(updateUserInput);
    const Education = user.EducationalBackground
      ? JSON.parse(`${user.EducationalBackground}`)
      : null;
    return { EducationalBackground: Education, ...user };
  }

  @Mutation('SuspendUser')
  //  @UseGuards(ClerkAuthGuard)
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async SuspendUser(
    @Args('UserID') UserID: string,
    @Args('suspendType') suspendType: SuspendType,
  ) {
    const user = await this.userService.suspendUser(UserID, suspendType);
    return user;
  }

  @Mutation('Follow')
  //  @UseGuards(ClerkAuthGuard)
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async Follow(
    @Args('FollowerID') FollowerID: string,
    @Args('FollowingID') FollowingID: string,
  ) {
    const user = await this.userService.follow(FollowerID, FollowingID);
    return user;
  }

  @Mutation('UnFollow')
  //  @UseGuards(ClerkAuthGuard)
  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  async UnFollow(


    @Args('FollowerID') FollowerID: string,
    @Args('FollowingID') FollowingID: string,
  ) {
    console.log("unfollow a doctor")
    const user = await this.userService.unfollow(FollowerID, FollowingID);
    return user;
  }

  @Mutation('RemoveUser')
  RemoveUser(@Args('UserID') UserID: string) { }

  @Mutation('UpdatePassword')
  async updatePassword(
    @Args('UserID') UserID: string,
    @Args('CurrentPassword') CurrentPassword: string,
    @Args('NewPassword') NewPassword: string,
  ) {
    return this.userService.updatePassword(
      UserID,
      CurrentPassword,
      NewPassword,
    );
  }
}
