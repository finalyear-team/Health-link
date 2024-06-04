import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { StreamChatService } from './stream-chat.service';
import { Response } from 'express';

@Controller('stream-chat')
export class StreamChatController {
  constructor(private readonly streamChatService: StreamChatService) {
  }


  @Post("/token")
  async createStreamToken(@Body() body:any,@Res() res:Response){
    const {UserID}=body
    const token=await this.streamChatService.createStreamUser(UserID)
    console.log(token)
    res.json(token)
    
  }
  
  @Post("create-dm")
  async streamDmChannel(@Body() {UserID,memberID}:{UserID:string,memberID:string},@Res() res:Response){
    console.log(UserID)
    console.log(memberID)
    console.log("come on man")
    const channel=await this.streamChatService.createDmChannel(UserID,memberID)
    console.log(channel)
    res.json(channel)
  }


  @Post("create-group")
  async groupChannel(@Body() {UserID,UserName,Role}:{UserID:string,UserName:string,Role:"admin"|"user"},@Res() res:Response){
    const token=this.streamChatService.createGroupChannel(UserID,"channel")
    console.log(token)
    res.json(token)
  }





}
