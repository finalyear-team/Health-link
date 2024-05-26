import { Body, Controller, Get, Next, Post, Query, Req, Res } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { UserRoles } from 'src/access-control/role.guard';
import { NextFunction, Response } from 'express';
import { CreateAppointmentInput } from 'src/appointment/dto/create-appointment.input';
import { CreateVideoCallRoomInput } from './dto/create-video_call.input';

@Controller('video-call')
export class VideoCallController {
  constructor(private readonly videoCallService: VideoCallService) {
    
  }

       @Get("/get-room")
      // @UseGuards(ClerkAuthGuard)
      // @Roles(UserRoles.DOCTOR)
      async getRoom(@Req() req:Request,@Res() res:Response,@Query("Doctor") host:string,@Query("Patient") member:string,@Next() next:NextFunction){
        console.log(host)
        console.log(member)
        const room=await this.videoCallService.getRoom(host,member)
        console.log(room)
        res.json( room)
       
      }
    
      @Post("create-room")
      async newRoom(@Body() createRoomInput:CreateVideoCallRoomInput,@Res() res:Response) {
        const input=new CreateVideoCallRoomInput(createRoomInput)        
        console.log(input)
        const room=await this.videoCallService.createRoom(input)  
        console.log(room)
        res.json(room)
      }
    

   }

  

  

