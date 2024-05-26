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
   
    
   
   
}
