import { Module } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { VideoCallController } from './video-call.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketService } from 'src/socket/socket.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [VideoCallController],
  providers: [VideoCallService, PrismaService, SocketGateway, SocketService, NotificationService],
})
export class VideoCallModule { }
