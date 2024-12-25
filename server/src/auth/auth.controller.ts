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
import { Role } from '@prisma/client';
import { DoctorDetailInput } from 'src/user/dto/create-user.input';
import { error } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from './google-oauth.guard';




@Controller('auth')
export class AuthController {
  private otpStore = new Map<string, string>();
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly userService: UserService
  ) { }

  // private setAccessTokenCookie = (
  //   res: Response,
  //   AccessToken: string,
  //   RefreshToken: string,
  // ) => {
  //   res.cookie('access_token', AccessToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     expires: new Date(Date.now() + 15 * 60 * 1000),
  //     path: '/',
  //   });

  //   res.cookie('refresh_token', RefreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     expires: new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000),
  //     path: '/',
  //   });
  // };

  // private removeAccessToken = (res: Response) => {
  //   res.cookie('access_token', '', {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     expires: new Date(0),
  //     path: '/',
  //   });
  //   res.cookie('refresh_token', '', {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     expires: new Date(0),
  //     path: '/',
  //   });
  // };


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
  async googleAuthCallback(@Req() req: Request) {
    const user = req.user as any;
    try {
      const response = await this.authService.googleLogin(user)

      return (`
        <script>
          window.opener.postMessage({
            user: ${JSON.stringify(user)},
          }, "http://localhost:3000");
          window.close();
        </script>
      `);

    } catch (error) {
      console.log(error)

    }


  }


  @Post('register')
  async signup(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

  }

  @Post("doctor-details")
  async doctorDetails(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

  }




  @Post('signin')
  async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {



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
