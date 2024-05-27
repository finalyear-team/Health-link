import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as HMS from "@100mslive/server-sdk"
import { SocketGateway } from 'src/socket/socket.gateway';
import { CreateVideoCallRoomInput } from './dto/create-video_call.input';
import { getTimeMilliSeconds } from 'src/utils/timeInMilliSeconds';
import { UpdateVideoCallInput } from './dto/update-video_call.input';


@Injectable()
export class VideoCallService {
    private hms: any
    constructor(private readonly webSocket: SocketGateway, private readonly prisma: PrismaService) {
        this.hms = new HMS.SDK()
    }


    //
    async generateToken(roomId: string, host: string, member: string, notValidBefore: number, Duration?: number) {
        try {
            console.log(Duration)
            const hostTokenConfig: HMS.AuthTokenConfig = {
                roomId,
                role: "host",
                userId: host,
                // issuedAt: Date.now() / 1000,
                // notValidBefore,
                // validForSeconds: Duration && Duration
            }
            const memberTokenConfig: HMS.AuthTokenConfig = {
                roomId,
                role: "guest",
                userId: member,
                // issuedAt: Date.now() / 1000,
                // notValidBefore,
                // validForSeconds: Duration && Duration
            }
            const HostAuthToken: any = await this.hms.auth.getAuthToken(hostTokenConfig)
            const MemberAuthToken: any = await this.hms.auth.getAuthToken(memberTokenConfig)
            return {
                HostAuthToken:HostAuthToken.token,
                MemberAuthToken:MemberAuthToken.token
            }
        } catch (error) {
            console.log(error)
            throw error

        }
    }


    // 
    async createRoom(createRoomInput: CreateVideoCallRoomInput) {
        const { RoomID, RoomName, HostID, MemberID, AppointmentDate, AppointmentTime } = createRoomInput
        const appointmentTimeInMilliseconds = getTimeMilliSeconds(AppointmentTime)
        const tokenNotValidBefore = (AppointmentDate.getTime() + appointmentTimeInMilliseconds) / 1000
        const { HostAuthToken } = await this.generateToken(RoomID, HostID, MemberID, tokenNotValidBefore)
        console.log(HostAuthToken)
        const { MemberAuthToken } = await this.generateToken(RoomID, HostID, MemberID, tokenNotValidBefore)
        try {
            const Room = await this.prisma.videoChatRoom.create({
                data: {
                    RoomID,
                    Name: RoomName,
                    HostID,
                    HostAuthToken,
                    Members: {
                        create: {
                            MemberID,
                            MemberAuthToken
                        }
                    },
                }
                ,
                include: {
                    Members: true
                }

            })
            console.log(Room)
            return Room
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    //
    async getRoom(HostID: string, MemberID: string) {
        console.log(HostID)
        console.log(MemberID)        
        try {
            const createdRoom = await this.prisma.videoChatRoom.findFirst({
                where: {
                    AND: [{
                        HostID
                    }, {
                        Members: {
                            some: {
                                MemberID
                            }

                        }
                    }
                    ]


                },
                include:{
                    Members:true
                }
            })
            if (createdRoom) {
                const authToken = await this.hms.auth.getManagementToken()
                return { createdRoom, authToken }
            }
        } catch (error) {
            throw error

        }

    }

    //
    async updateToken(UpdateVideoCallInput: UpdateVideoCallInput) {
        const { RoomID, HostID, MemberID, HostAuthToken, MemberAuthToken } = UpdateVideoCallInput
        try {
            const Room = await this.prisma.videoChatRoom.update({
                where: {
                    RoomID,
                    HostID
                },
                data: {
                    HostAuthToken,
                    Members: {
                        update: {
                            where: {
                                MemberID
                            },
                            data: {
                                MemberAuthToken
                            }
                        }
                    },
                }
            })
            console.log(Room)
            return Room
        } catch (error) {
            throw error

        }
    }



}
