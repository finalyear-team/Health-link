import { Module } from '@nestjs/common';
import { StreamChatService } from './stream-chat.service';
import { StreamChatController } from './stream-chat.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { SharedModule } from 'src/shared/shared.module';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketService } from 'src/socket/socket.service';
import { StreamResolver } from './stream-chat.resolver';

@Module({
  imports: [SharedModule],
  controllers: [StreamChatController],
  providers: [StreamChatService, PrismaService, UserService, StreamResolver],
})
export class StreamChatModule { }
