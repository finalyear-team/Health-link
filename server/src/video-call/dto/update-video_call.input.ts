import { PartialType } from "@nestjs/mapped-types";
import { CreateVideoCallRoomInput } from "./create-video_call.input";

export class UpdateVideoCallInput extends PartialType(CreateVideoCallRoomInput){
    RoomID: string;
    HostID: string;
    MemberID: string;
    HostAuthToken:string
    MemberAuthToken:string    
}
