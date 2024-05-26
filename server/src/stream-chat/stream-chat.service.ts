import { User } from '@clerk/clerk-sdk-node';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StreamChat } from 'stream-chat';

@Injectable()
export class StreamChatService {
    private STREAM_CHAT_API_KEY = process.env.STREAM_CHAT_API_KEY
    private STREAM_CHAT_SECRET = process.env.STREAM_SECRET_KEY
    private stream: StreamChat
    constructor(private readonly prisma: PrismaService) {
        this.stream = StreamChat.getInstance(this.STREAM_CHAT_API_KEY, this.STREAM_CHAT_SECRET)
        console.log()
    }


    async createStreamUser(UserID: string, role: "admin" | "user") {
        try {
            const user = await this.stream.upsertUser({
                id: UserID,
                role,
            })
            const userToken = this.stream.createToken(UserID)
            console.log(userToken)
            return userToken
        } catch (error) {
            throw error

        }

    }



    async createDmChannel(UserID: string, memberID: string) {
        try {
            const userToken = await this.createStreamUser(UserID, "user")
            const memeberToken = await this.createStreamUser(memberID, "user")

            const channelID = `dm-${UserID}-${memberID}`
            const channel = this.stream.channel("messaging", channelID, {
                name: "DM",
                members: [UserID, memberID]
            })
            console.log(channelID)
            const response = await channel.create()
            console.log(response)
            const Channel = await this.prisma.chatChannel.create({
                data: {
                    ChannelID: channelID,
                    ChannelName: "DM",
                    ChannelType: "dm",
                    Members: {
                        createMany: {
                            data: [{
                                UserID,
                                AuthToken: userToken
                            },
                            {
                                UserID:memberID,
                                AuthToken: memeberToken
                            },
                            ]
                        }
                    }


                }

            })
            console.log(channel)
            console.log(response)
            return response

        } catch (error) {
            throw error
        }
    }

    async createGroupChannel(UserID:string,ChannelName:string,image?:string){
        try {
         const channelID=`group-${ChannelName}-${randomBytes(3).toString("hex")}`
         const channel=this.stream.channel("messaging",channelID,{
            created_by_id:UserID,
            name:ChannelName,
            image,            
         })

         const AuthToken=await this.createStreamUser(UserID,"admin")

         const createdChannel=await this.prisma.chatChannel.create({
             data:{
                ChannelID:channelID,
                ChannelName,
                Image:image,
                ChannelType:"supportGroup",
                Members:{
                    create:{
                        UserID,
                        Role:"admin",

                    }
                }
             }
         })
         
        } catch (error) {
            throw error
            
        }
    }

    async joinGroup(channelID:string,ChannelName:string,UserID:string){
        try {
            const searchChannel=await this.prisma.chatChannel.findFirst({
                where:{
                    ChannelID:channelID,
                    ChannelName                }
            })
            if(!searchChannel)
                 throw new HttpException("channel not found",HttpStatus.BAD_REQUEST)

           const group= this.stream.getChannelById("messaging",channelID,{
             name:ChannelName
           })

           const AuthToken=await this.createStreamUser(UserID,"user")

           const member=await group.addMembers([{
            user_id:UserID,
            channel_role:"user",             
           }])
           console.log(member)
           const selectedGroup=await this.prisma.chatChannel.update({
                where:{
                    ChannelID:channelID
                },
                data:{
                    Members:{
                        create:{
                            UserID,
                            Role:"member",
                            AuthToken                            
                        }
                    }
                }
           })

        } catch (error) {
            throw error
        }


    }



}
