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
  async getRoom(@Req() req: Request, @Res() res: Response, @Query("Doctor") host: string, @Query("Patient") member: string, @Next() next: NextFunction) {
    const room = await this.videoCallService.getRoom(host, member)
    res.json(room)

  }

  @Post("create-room")
  async newRoom(@Req() req: Request, @Res() res: Response) {
    const input = new CreateVideoCallRoomInput(req.body)
    const room = await this.videoCallService.createRoom(input)
    res.json(room)
  }

  @Get("/management-token")
  async getManagementToken(@Res() res: Response) {
    return await this.videoCallService.getManagmentToken()
  }

}





