import { Module } from '@nestjs/common';
import { DoctorReviewService } from './doctor-review.service';
import { DoctorReviewResolver } from './doctor-review.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DoctorReviewResolver, DoctorReviewService,PrismaService],
})
export class DoctorReviewModule {}
