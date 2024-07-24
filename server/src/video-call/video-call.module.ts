import { Module } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { VideoCallController } from './video-call.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketService } from 'src/socket/socket.service';
import { NotificationService } from 'src/notification/notification.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [VideoCallController],
  providers: [VideoCallService, PrismaService, NotificationService],
})
export class VideoCallModule { }
