import { Module } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { VideoCallController } from './video-call.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  controllers: [VideoCallController],
  providers: [VideoCallService,PrismaService,SocketGateway],
})
export class VideoCallModule {}
