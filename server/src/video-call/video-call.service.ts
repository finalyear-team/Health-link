import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as HMS from "@100mslive/server-sdk"

@Injectable()
export class VideoCallService {
  private hms: any
    constructor(private readonly prisma:PrismaService){
       this.hms= new HMS.SDK()     
       console.log(this.hms) 
    }

    async getRoom(){
        try {
            const room=await this.hms.api.get("https://api.100ms.live/v2/rooms/66484a86a4c05af8cc38c694")
            console.log(room)
        } catch (error) {
            
        }
    }
    
}
