import { Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { json } from 'stream/consumers';
import { Request, Response } from 'express';
import { ClerkAuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}
    
   
    
   
    @Get("")
    @UseGuards(ClerkAuthGuard)
    async clerkUsers(){
      return this.authService.clerkUser()
    }
    @Get("verify-email")
    async verifyEmail() {}

    @Get("reset-password")
    async resetPassword(
        @Query("token") token: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const decodedToken = token?await this.authService.validateToken(
            token,
            process.env.PASSWORD_RESET_SECRET
        ):null;
        if (!decodedToken) {
            throw new HttpException("Invalid token", HttpStatus.BAD_REQUEST);
        }
        if (this.authService.isTokenExpired(decodedToken.exp)) {
            throw new HttpException("Token Expired", HttpStatus.BAD_REQUEST);
        }

        res.redirect(`${process.env.CLIENT_URL}/new`);
    }
}
