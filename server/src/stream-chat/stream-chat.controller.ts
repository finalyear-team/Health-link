import { Controller } from '@nestjs/common';
import { StreamChatService } from './stream-chat.service';

@Controller('stream-chat')
export class StreamChatController {
  constructor(private readonly streamChatService: StreamChatService) {}
}
