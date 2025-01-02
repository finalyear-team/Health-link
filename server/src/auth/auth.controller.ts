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

  private sendOtp = async (Email: string, FirstName: string, OTPSecret: string) => {
    try {
      const decryptedOtpsecret = this.authService.decryptSecret(OTPSecret, process.env.OTP_ENCRYPTION_KEY);

      const totp = this.authService.generateTOTP(decryptedOtpsecret);
      const response = await this.mailService.sendVerificationEmail(Email, FirstName, totp)

      console.log("from mail")
      console.log(response)

      return true

    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }

  private generateAndSetTokens = async (user: any, res: Response) => {
    const payload = { sub: user.UserID, username: user.FirstName, role: UserType.PATIENT }
    const access_token = this.authService.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "15m");
    const refresh_token = this.authService.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "7d");

    this.setAccessTokenCookie(res, access_token, refresh_token);

  }

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

      if (response.user && !response.user.Verified) {
        this.sendOtp(response.user.Email, response.user.FirstName, response.user.OTPSecret)
        return res.redirect(`${process.env.FRONTEND_URL}/sign-in?UID=${response.user.UserID}&verify=true`)
      }

      this.generateAndSetTokens(response.user, res)
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard/${response.user.Role}`);

    } catch (error) {
      console.log(error)
      return res.status(500).redirect(`${process.env.FRONTEND_URL}/sign-in?SigninError=${error.message}`)

    }


  }


  @Post('register')
  async signup(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const { Password, ...otherData } = req.body
      const registerdUser = await this.userService.getUserByEmail(req.body.Email)
      let user: Users = registerdUser;
      console.log(registerdUser)

      if (!registerdUser)
        user = await this.authService.Register(req.body)
      if (registerdUser && registerdUser.isSocialAccount) {
        const OTPSecret = this.authService.encryptSecret(this.authService.generateOtpSecret(), process.env.OTP_ENCRYPTION_KEY);
        const hashedPassword = await this.authService.HashPassword(Password)

        user = await this.userService.updateUser({ UserID: registerdUser.UserID, OTPSecret, Password: hashedPassword, ...otherData })
      }

      this.sendOtp(user.Email, user.FirstName, user.OTPSecret)

      return res.status(201).send({
        user: user,
        otpVerify: true
      })

    } catch (error: any) {
      console.log(error)
      res.status(500).json("something went wrong");

    }

  }

  @Post("doctor-details")
  async doctorDetails(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

  }




  @Post('signin')
  async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const { Email, Password } = req.body
      const user = await this.authService.Login({ Email, Password })

      if (user && !user.Verified) {
        this.sendOtp(user.Email, user.FirstName, user.OTPSecret)
        return res.status(200).send({
          user: user,
          otpVerify: true
        })
      }


      this.generateAndSetTokens(user, res)

      return res.status(200).send({
        user: user,
        otpVerify: false
      })

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)

    }


  }


  @Post("verify-otp")
  async verifyOtp(@Body('token') token: string, @Body("UserID") UserID: string, @Res() res: Response) {
    try {

      console.log("this from verify-otp")
      const user = await this.userService.getUserDetails(UserID)

      if (!user)
        res.status(401).send("User not found....")

      const decryptedOtpsecret = this.authService.decryptSecret(user.OTPSecret, process.env.OTP_ENCRYPTION_KEY)

      const isValid = this.authService.validateTOTP(token, decryptedOtpsecret)
      console.log(isValid)

      if (!isValid)
        return res.status(403).send("Token is not valid")

      this.generateAndSetTokens(user, res)

      return res.status(200).send(user)

    } catch (error) {
      console.log(error)
      return res.status(500).send("something went wrong ....")


    }

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
