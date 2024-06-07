import { Module } from '@nestjs/common';
import { SymptomCheckerService } from './symptom-checker.service';
import { SymptomCheckerController } from './symptom-checker.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SymptomCheckerController],
  providers: [SymptomCheckerService, PrismaService],
})
export class SymptomCheckerModule { }
