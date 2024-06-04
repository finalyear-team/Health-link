import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { UpdateFeedbackInput } from './dto/update-feedback.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma:PrismaService){}

  create(createFeedbackInput: CreateFeedbackInput) {
  }

  findAll() {
  }

  findOne(id: number) {
  }

  update(id: number, updateFeedbackInput: UpdateFeedbackInput) {
  }

  remove(id: number) {
  }
}
