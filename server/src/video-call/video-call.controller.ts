import { Controller, Get } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { UserRoles } from 'src/access-control/role.guard';

@Controller('video-call')
export class VideoCallController {
  constructor(private readonly videoCallService: VideoCallService) {
    
  }

  // @Get("/get-room")
  //  async getRoom(){
  //     this.videoCallService.getRoom()
  //     @Get("/get-room")
  //     // @UseGuards(ClerkAuthGuard)
  //     // @Roles(UserRoles.DOCTOR)
  //     async getRoom(@Req() req:Request,@Res() res:Response,@Query("host") host:string,@Query("member") member:string,@Next() next:NextFunction){
  //       res.json(await this.streamService.getRoom(host,member))
  //     }
    
  //     @Post("create-room")
  //     async newRoom(@Req() req:Request,@Res() res:Response) {
  //       const {room,host,member}=req?.body as any  
  //      res.json( await this.streamService.newRoom(room.id,room.name,host,member));
  //     }
    
  //     @Post("/generate-auth-token")
  //     async createCallRoom(@Req() req:Request,@Res() res:Response) {
  //       const {room,host,member}=req?.body as any  
  //      res.json( await this.streamService.generateToken({room,host,member}));
  //     }

  //  }

  

  

}
