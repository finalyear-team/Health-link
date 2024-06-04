import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BlogResolver, BlogService,PrismaService],
})
export class BlogModule {}
