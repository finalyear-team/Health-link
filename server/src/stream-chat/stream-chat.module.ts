import { Module } from '@nestjs/common';
import { StreamChatService } from './stream-chat.service';
import { StreamChatController } from './stream-chat.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [StreamChatController],
  providers: [StreamChatService,PrismaService,UserService],
})
export class StreamChatModule {}
