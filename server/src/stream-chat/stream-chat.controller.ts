import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { StreamChatService } from './stream-chat.service';
import { Response } from 'express';

@Controller('stream-chat')
export class StreamChatController {
  constructor(private readonly streamChatService: StreamChatService) {
  }

  @Post("create-dm")
  async streamDmChannel(@Body() {UserID,memberID}:{UserID:string,memberID:string},@Res() res:Response){
    const token=this.streamChatService.createDmChannel(UserID,memberID)
    console.log(token)
    res.json(token)
  }


  @Post("create-group")
  async groupChannel(@Body() {UserID,UserName,Role}:{UserID:string,UserName:string,Role:"admin"|"user"},@Res() res:Response){
    const token=this.streamChatService.createGroupChannel(UserID,"channel")
    console.log(token)
    res.json(token)
  }





}
