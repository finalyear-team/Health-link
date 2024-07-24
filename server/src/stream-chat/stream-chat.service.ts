import { User } from '@clerk/clerk-sdk-node';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes, randomUUID } from 'crypto';
import { includes } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { StreamChat } from 'stream-chat';
import { SendMessageDto } from './dto/create-stream.input';

@Injectable()
export class StreamChatService {
    private STREAM_CHAT_API_KEY = process.env.STREAM_CHAT_API_KEY
    private STREAM_CHAT_SECRET = process.env.STREAM_SECRET_KEY
    private stream: StreamChat
    constructor(private readonly prisma: PrismaService, private readonly userService: UserService) {
        this.stream = StreamChat.getInstance(this.STREAM_CHAT_API_KEY, this.STREAM_CHAT_SECRET)



    }

    async getClient() {
        try {
            await this.stream.deleteUser('user_2h44MeMDA4TY9RqKZqMio9PV04I', {
                delete_conversation_channels: true,
                mark_messages_deleted: true,
                hard_delete: true,
            });
        } catch (error) {
            console.log(error)

        }

    }

    async createStreamUser(UserID: string, role?: "admin" | "user") {
        try {

            const users = await this.stream.queryUsers({ id: UserID })

            const user = await this.stream.upsertUser({
                id: UserID,
                role,
            })
            const userToken = this.stream.createToken(UserID)
            console.log(userToken)
            return userToken
        } catch (error) {
            console.log("error from createStreamUser")
            console.log(this.stream.axiosInstance)
            throw error

        }

    }

    async checkExistingChannel(Member1ID, Member2ID) {
        try {
            const channel = await this.prisma.chatChannel.findFirst({
                where: {
                    Members: {
                        every: {
                            UserID: {
                                in: [Member1ID, Member2ID],
                            },
                        },
                    },
                },
                include: {
                    Members: true, // Include members in the returned channel object
                },
            });
            console.log("from chat service")
            console.log(channel)
            return channel
        } catch (error) {

        }
    }


    // Assuming these imports are correct

    async createDmChannel(Member1ID: string, Member2ID: string): Promise<any> {
        try {
            if (await this.checkExistingChannel(Member1ID, Member2ID))
                return await this.checkExistingChannel(Member1ID, Member2ID)
            // Fetch user details for validation and naming
            const Member1 = await this.userService.getUserDetails(Member1ID);
            const Member2 = await this.userService.getUserDetails(Member2ID);

            if (!Member1) {
                throw new HttpException(`${Member1?.FirstName} not found`, HttpStatus.NOT_FOUND);
            }
            if (!Member2) {
                throw new HttpException(`${Member2?.FirstName} not found`, HttpStatus.NOT_FOUND);
            }


            const ChannelName = `dm-${Member1.FirstName}-${Member2.FirstName}`

            // Generate a unique channel ID for the DM channel
            const ChannelID = `dm-${randomBytes(3).toString('hex')}`;

            // Create the DM channel in the database with the dynamic name
            const channel = await this.prisma.chatChannel.create({
                data: {
                    ChannelID,
                    ChannelName,
                    ChannelType: "dm",
                    Members: {
                        createMany: {
                            data: [{
                                ID: randomUUID(),
                                UserID: Member1ID,
                                Role: "member"

                            }, {
                                ID: randomUUID(),
                                UserID: Member2ID,
                                Role: "member"
                            }]
                        }
                    }
                }
            })

            console.log("from create dm")
            console.log(channel)

            // Return the newly created channel
            return channel;
        } catch (error) {
            console.error("Error from createDmChannel:", error);
            throw error;
        }
    }

    async getChannelByUserID(UserID: string) {
        try {
            const UserChannel = await this.prisma.chatChannel.findMany({
                where: {
                    Members: {
                        some: {
                            UserID
                        }
                    }
                },
                include: {
                    Members: {
                        select: {
                            User: {
                                select: {
                                    UserID: true,
                                    Username: true,
                                    FirstName: true,
                                    LastName: true,
                                    ProfilePicture: true,
                                    Role: true
                                }
                            }
                        }
                    },
                }
            },

            )
            return UserChannel.map((channel => ({
                ...channel,
                Members: channel.Members.filter(User => User.User.UserID !== UserID).map(user => ({ ...user.User }))

            })))
        } catch (error) {

        }

    }


    async getChannelByID(ChannelID: string) {
        try {
            const channel = await this.prisma.chatChannel.findUnique({
                where: {
                    ChannelID
                }, include: {
                    Members: {
                        select: {
                            User: {
                                select: {
                                    UserID: true,
                                    Username: true,
                                    FirstName: true,
                                    LastName: true,
                                    ProfilePicture: true,
                                }
                            }
                        }
                    }

                }
            })

            console.log(channel)

        } catch (error) {

        }

    }


    async getChannelChats(UserID: string, ChannelID: string) {
        try {
            const chats = await this.prisma.chatMessage.findMany({
                where: {
                    ChannelID,
                    Channel: {
                        Members: {
                            some: {
                                UserID
                            }
                        }
                    }

                },
                include: {
                    Sender: true,
                },
                orderBy: {
                    SentAt: "asc"
                }
            });

            const formattedChats = chats.map(chat => ({
                ...chat,
                type: chat.Sender.UserID === UserID ? 'myChat' : 'other'
            }));

            return formattedChats;
        } catch (error) {
            console.error('Error fetching chats:', error);
            throw new Error('Could not fetch chats');
        }
    }


    async storeChats(message: SendMessageDto) {
        try {
            const chat = await this.prisma.chatMessage.create({
                data: {
                    ChannelID: message.ChannelID,
                    Content: message.Content,
                    MediaUrl: message.MediaUrl,
                    SenderID: message.SenderID
                }

            })

        } catch (error) {

        }
    }
    async createGroupChannel(UserID: string, ChannelName: string, image?: string) {
        try {
            const channelID = `group-${ChannelName}-${randomBytes(3).toString("hex")}`
            const channel = this.stream.channel("messaging", channelID, {
                created_by_id: UserID,
                name: ChannelName,
                image,
            })

            const AuthToken = await this.createStreamUser(UserID, "admin")

            const createdChannel = await this.prisma.chatChannel.create({
                data: {
                    ChannelID: channelID,
                    ChannelName,
                    Image: image,
                    ChannelType: "supportGroup",
                    Members: {
                        create: {
                            UserID,
                            Role: "admin",
                            AuthToken
                        }
                    }
                }
            })

        } catch (error) {
            console.log("error from group Channel")
            console.log(error)
            throw error

        }
    }


    async joinGroup(channelID: string, ChannelName: string, UserID: string) {
        try {
            const searchChannel = await this.prisma.chatChannel.findFirst({
                where: {
                    ChannelID: channelID,
                    ChannelName
                }
            })
            if (!searchChannel)
                throw new HttpException("channel not found", HttpStatus.BAD_REQUEST)

            const group = this.stream.getChannelById("messaging", channelID, {
                name: ChannelName
            })

            const AuthToken = await this.createStreamUser(UserID, "user")

            const member = await group.addMembers([{
                user_id: UserID,
                channel_role: "user",
            }])
            console.log(member)
            const selectedGroup = await this.prisma.chatChannel.update({
                where: {
                    ChannelID: channelID
                },
                data: {
                    Members: {
                        create: {
                            UserID,
                            Role: "member",
                            AuthToken
                        }
                    }
                }
            })

        } catch (error) {
            throw error
        }
    }

    async deleteChat(ChatID: string) {
        try {

            const chat = await this.prisma.chatMessage.delete({
                where: {
                    ChatID
                }
            })

            console.log(chat)
            console.log(chat)
            return chat

        } catch (error) {

            throw error
        }
    }

}


