import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackResolver } from './feedback.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FeedbackResolver, FeedbackService,PrismaService],
})
export class FeedbackModule {}
