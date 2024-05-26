import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentController } from './appointment.controller';
import { VideoCallService } from 'src/video-call/video-call.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { ScheduleService } from 'src/schedule/schedule.service';

@Module({
  providers: [AppointmentResolver, AppointmentService,PrismaService,VideoCallService,SocketGateway,ScheduleService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
