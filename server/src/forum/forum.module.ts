import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumResolver } from './forum.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ForumResolver, ForumService,PrismaService],
})
export class ForumModule {}
