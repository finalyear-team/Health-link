import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketService } from 'src/socket/socket.service';
import { MailService } from 'src/mail/mail.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy ';
import { NotificationService } from 'src/notification/notification.service';



@Module({
  providers: [AuthService, PrismaService, UserService, JwtService, MailService, UserService, NotificationService],
  controllers: [AuthController]
})
export class AuthModule { }
