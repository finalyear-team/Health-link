import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { NotificationService } from 'src/notification/notification.service';
import { GoogleStrategy } from './google.strategy';



@Module({
  providers: [AuthService, PrismaService, UserService, JwtService, MailService, UserService, NotificationService, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
