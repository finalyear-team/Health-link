import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { ResetInput, UpdateUserInput } from './dto/update-user.input';
import { LoginInput, RegisterInput } from 'src/auth/dto/auth-input';
import { AuthService } from 'src/auth/auth.service';
import { Response, response } from 'express';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService,private readonly authService:AuthService) {}

  @Mutation("login")
  async login(@Args("signinInput") signinInput:LoginInput,@Context("res") res:Response){ 
    const{access_token,user}=await this.authService.Login(signinInput)
    res.cookie("access_token",access_token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"none",
      expires: new Date(Date.now() + 15 * 60 * 1000),

    })
    return user
  }

  @Mutation('register')
  async register(@Args('signupInput') signUpInput:RegisterInput,@Context("res") res:Response ) {
     const {access_token,refresh_token,user}=await this.authService.Register(signUpInput);
     res.cookie("access_token",access_token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"none",
      expires: new Date(Date.now() + 15 * 60 * 1000),

    })
    res.cookie("refresh_token",refresh_token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"none",
      expires: new Date(Date.now() + 24 * 30 * 60 * 60 * 1000),

    })
     return user
  } 
  @Mutation("resetEmail")
  async resetEmail(@Args("resetEmail") email:string){
    return await this.authService.resetEmail(email)
  }
  @Mutation("verifyResetCode")
  async verifyCode(@Args("verifyCode") verifyCode:string){
    console.log("new ")

  }
  @Mutation("resetPassword")
   async resetPassword(@Args("resetInput") resetInput:ResetInput){
    console.log(resetInput)

   }



  @Query('users')
  findAll() {
    console.log("come onam")
    return this.userService.findAll();
  }

  @Query('me')
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
