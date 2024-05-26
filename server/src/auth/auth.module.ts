import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';



@Module({
   providers: [AuthService,PrismaService,UserService,JwtService],
  controllers:[AuthController]
})
export class AuthModule {}
