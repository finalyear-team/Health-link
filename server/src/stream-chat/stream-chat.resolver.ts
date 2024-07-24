import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StreamChatService } from './stream-chat.service';
// import { CreateStreamInput } from './dto/create-stream.input';
// import { UpdateStreamInput } from './dto/update-stream.input';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamChatService) { }


  @Query('userChannel')
  async getChannels(@Args("UserID") UserID: string) {
    const userChannel = await this.streamService.getChannelByUserID(UserID)
    console.log(userChannel.forEach(channel => console.log(channel.Members)))
    return userChannel
  }

  @Query('getChannel')
  getChannel(@Args('ChannelID') ChannelID: string) {
    return this.streamService.getChannelByID(ChannelID)
  }


  @Query("getChats")
  getChats(@Args("UserID") UserID: string, @Args("ChannelID") ChannelID: string) {

    return this.streamService.getChannelChats(UserID, ChannelID)
  }

  @Mutation("deleteChat")
  deleteChat(@Args("ChatID") ChatID: string) {
    return this.streamService.deleteChat(ChatID)

  }


}
