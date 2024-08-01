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
import { Token } from 'graphql';
import * as crypto from "crypto"
import { UserService } from 'src/user/user.service';
import { Role } from '@prisma/client';
import { DoctorDetailInput } from 'src/user/dto/create-user.input';
import { error } from 'console';




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


  generateOtp(length = 6): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
    }
    return otp;
  }

  storeOtp(email: string, otp: string): void {
    this.otpStore.set(email, otp);
  }


  @Post('register')
  async signup(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.removeAccessToken(res)
    const input = new SignUpDto(req.body)
    const { user, access_token, refresh_token } = await this.authService.Register(input)
    res.json({ user, access_token, refresh_token })
  }

  @Post("doctor-details")
  async doctorDetails(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const input = new DoctorDetailsInputs(req.body)
    console.log(input.EducationalBackground)
    const edu = input.EducationalBackground
    const user = await this.authService.DoctorDetailsRegister(input)

    res.status(201).json(user)
  }




  @Post('signin')
  async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.removeAccessToken(res);
    const { user, access_token, refresh_token } = await this.authService.Login(
      req.body,
    );
    this.setAccessTokenCookie(res, access_token, refresh_token)

    res.json({
      user, access_token, refresh_token
    })
  }

  @Post("send-email")
  async sendEmailVerification(@Req() req: Request, @Res() res: Response) {
    console.log("send email called")
    console.log(req.body.email)

    const otp = this.generateOtp(6)
    this.storeOtp(req.body.email, otp)


    const email = await this.mailService.sendVerificationEmail(req.body.email, req.body.FirstName, otp)
    console.log(email)
    res.status(201).json("email sent successfully")

  }

  @Post("/verify-otp")
  async verifyOtp(@Req() req: Request, @Res() res: Response) {
    const storedOtp = this.otpStore.get(req.body.email);

    console.log(storedOtp)
    console.log(req.body.otp)

    // throw new Error("error")

    try {
      if (storedOtp && storedOtp !== req.body.otp)
        throw new Error("user not verified")

      const user = await this.userService.getUserByEmail(req.body.email)

      if (!user)
        throw new Error("user not found")

      const updatedUser = await this.userService.updateUser({
        UserID: user.UserID,
        Verified: true
      })

      const payload = { sub: updatedUser.UserID, username: updatedUser.Username, role: updatedUser.Role }

      const access_token = this.authService.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "1hr")

      const refresh_token = this.authService.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "30d")

      this.setAccessTokenCookie(res, access_token, refresh_token)

      res.status(200).json(updatedUser);


    } catch (error) {
      throw error

    }


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
    this.removeAccessToken(res);
    res.json('user logged out');
  }







  // @UseGuards(JWTGuard)
  // @Get('profile')
  // async getProfile(@Req() req) {
  //   const { userId } = req.user;
  //   const {
  //     Id,
  //     FullName,
  //     Email,
  //     UserName,
  //     UserType,
  //     Image,
  //     WorkingPhone,
  //     MobilePhone,
  //     Verified,
  //   } = await this.authService.UserProfile(userId);

  //   return {
  //     Id,
  //     FullName,
  //     Email,
  //     UserName,
  //     UserType,
  //     Image,
  //     WorkingPhone,
  //     MobilePhone,
  //     Verified,
  //   };
  // }
  // private isTokenExpired(expirationTimestamp: number) {
  //   const now = Date.now() / 1000;
  //   return now >= expirationTimestamp;
  // }
  // @Post('setCookie')
  // async setCookie(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const { AccessToken, RefreshToken } = req.body;
  //   console.log(req.body);
  //   this.setAccessTokenCookie(res, AccessToken, RefreshToken);
  //   res.status(200).json('email confirmed');
  // }

  @Post('refresh')
  async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!req.cookies['refresh_token']) {
      throw new UnauthorizedException('User not authorized...')
    }
    try {
      const decodedToken = this.authService.validateToken(
        req.cookies['refresh_token'],
        process.env.JWT_REFRESH_KEY
      );
      if (!decodedToken || this.authService.isTokenExpired(decodedToken.exp))
        throw new UnauthorizedException('User not authorized...');

      const userId = decodedToken.sub;
      const user = await this.userService.getUserDetails(userId)
      if (!user) throw new UnauthorizedException('User not authorized...');
      const payload = { sub: user.UserID, username: user.Username, role: user.Role, status: user.Status };
      const AccessToken = this.authService.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "30d");
      const RefreshToken = this.authService.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "60d");

      this.setAccessTokenCookie(res, AccessToken, RefreshToken)

      res.status(200).json(user)


    } catch (e) {
      throw new UnauthorizedException('User is not authorized .....');
    }
  }
}
