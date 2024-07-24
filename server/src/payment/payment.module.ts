import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AppointmentService } from 'src/appointment/appointment.service';
import { VideoCallService } from 'src/video-call/video-call.service';
import { SocketService } from 'src/socket/socket.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { NotificationService } from 'src/notification/notification.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, UserService, VideoCallService, NotificationService, ScheduleService],
})
export class PaymentModule { }
