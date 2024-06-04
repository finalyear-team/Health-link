import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StreamChatService } from './stream-chat.service';
import { CreateStreamInput } from './dto/create-stream.input';
import { UpdateStreamInput } from './dto/update-stream.input';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamChatService) {}

  @Mutation('createStream')
  create(@Args('createStreamInput') createStreamInput: CreateStreamInput) {
    console.log("first")
  }

  @Query('streams')
  findAll() {
  }

  @Query('stream')
  findOne(@Args('id') id: number) {
  }

  @Mutation('updateStream')
  update(@Args('updateStreamInput') updateStreamInput: UpdateStreamInput) {
  }

  @Mutation('removeStream')
  remove(@Args('id') id: number) {
  }
}
