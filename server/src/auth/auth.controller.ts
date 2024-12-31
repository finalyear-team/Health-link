import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Options,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DoctorDetailsInputs, SignInDto, SignUpDto } from './dto/auth-input';
import { JWTGuard } from './auth.guard';
import { Request, Response } from 'express';
import { Timestamp } from 'rxjs';

import { SocketGateway } from 'src/socket/socket.gateway';
import { MailService } from 'src/mail/mail.service';
import { Token, validate } from 'graphql';
import * as crypto from "crypto"
import { UserService } from 'src/user/user.service';
import { Role, Users } from '@prisma/client';
import { DoctorDetailInput } from 'src/user/dto/create-user.input';
import { error } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { UserType } from 'src/utils/types';




@Controller('auth')
export class AuthController {
  private otpStore = new Map<string, string>();
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly userService: UserService
  ) { }

  private setAccessTokenCookie = (
    res: Response,
    AccessToken: string,
    RefreshToken: string,
  ) => {
    res.cookie('access_token', AccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 15 * 60 * 1000),
      path: '/',
    });

    res.cookie('refresh_token', RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000),
      path: '/',
    });
  };

  private removeAccessToken = (res: Response) => {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
      path: '/',
    });
    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
      path: '/',
    });
  };


  @Get("google/signin")
  @UseGuards(GoogleOAuthGuard)
  async googleSignin(@Req() req: Request) {
    console.log("google-signedin")

  }

  @Get("google/singup")
  async googleSignup(@Req() req: Request) {

  }


  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as any;
    try {
      const response = await this.authService.googleLogin(user);
      if (response.redirect) {
        return res.redirect(`${process.env.FRONTEND_URL}/register/patient?patientId=${response.user.UserID}&SocialAccount=true`)

      }
      const payload = { sub: response.user.UserID, username: response.user.FirstName, role: UserType.PATIENT }
      const access_token = this.authService.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "15m");
      const refresh_token = this.authService.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "60d");

      this.setAccessTokenCookie(res, access_token, refresh_token);
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard/${response.user.Role}`);



    } catch (error) {
      console.log(error)
      return res.status(500).redirect(`${process.env.FRONTEND_URL}/sign-in?SigninError=${error.message}`)

    }


  }


  @Post('register')
  async signup(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const registerdUser = await this.userService.getUserByEmail(req.body.Email)
      let user: Users;
      if (!registerdUser)
        user = await this.userService.RegisterUser(req.body)
      if (registerdUser.isSocialAccount)
        user = await this.userService.updateUser({ UserID: registerdUser.UserID, ...req.body })
      console.log("from register user");
      console.log(user)
      res.status(201).json(user)
    } catch (error: any) {
      res.status(500).json("something went wrong");

    }

  }

  @Post("doctor-details")
  async doctorDetails(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

  }




  @Post('signin')
  async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { Email, Password } = req.body
    const user = await this.authService.Login({ Email, Password })
    return user

  }

  @Post("send-email")
  async sendEmailVerification(@Req() req: Request, @Res() res: Response) {


  }



  @Post("resetPassword")
  async resetPassword(@Req() req: Request, @Res() res: Response) {
    const reset = await this.mailService.sendResetPasswordEmail(req.body)

  }

  @Get('sign-out')
  async signout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
  }


  @Post('refresh')
  async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {


  }
}
