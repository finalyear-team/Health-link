import { Module } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { VideoCallController } from './video-call.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VideoCallController],
  providers: [VideoCallService,PrismaService],
})
export class VideoCallModule {}
