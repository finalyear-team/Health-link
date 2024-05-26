import { Module } from '@nestjs/common';
import { StreamChatService } from './stream-chat.service';
import { StreamChatController } from './stream-chat.controller';

@Module({
  controllers: [StreamChatController],
  providers: [StreamChatService],
})
export class StreamChatModule {}
