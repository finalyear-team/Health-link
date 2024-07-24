// src/shared/shared.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { SocketGateway } from '../socket/socket.gateway';
import { PaymentService } from '../payment/payment.service';
import { SocketService } from 'src/socket/socket.service';
import { UserService } from 'src/user/user.service';
import { AppService } from 'src/app.service';
import { AuthService } from 'src/auth/auth.service';
import { AccessControlService } from 'src/access-control/access-control.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy ';
import { UserResolver } from 'src/user/user.resolver';
import { MailService } from 'src/mail/mail.service';
import { AppointmentService } from 'src/appointment/appointment.service';
import { VideoCallService } from 'src/video-call/video-call.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { StreamChatService } from 'src/stream-chat/stream-chat.service';
// Import other services here
@Global()
@Module({
    providers: [AuthService, UserService, UserResolver, PrismaService, AccessControlService, MailService, JwtStrategy, JwtService, NotificationService, AppointmentService, VideoCallService, ScheduleService, PaymentService, StreamChatService],
    exports: [
        AuthService, UserService, UserResolver, PrismaService, AccessControlService, MailService, JwtStrategy, JwtService, NotificationService, AppointmentService, VideoCallService, ScheduleService, PaymentService, StreamChatService
    ],
})
export class SharedModule { }
