import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentController } from './appointment.controller';
import { VideoCallService } from 'src/video-call/video-call.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketService } from 'src/socket/socket.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentModule } from 'src/payment/payment.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [AppointmentResolver, AppointmentService, PrismaService, VideoCallService, ScheduleService, NotificationService, UserService, PaymentService],
  controllers: [AppointmentController],
  exports: [AppointmentService]
})
export class AppointmentModule { }
