import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { Server, Socket } from 'socket.io';
import { NotificationService } from 'src/notification/notification.service';
import { addHours, differenceInYears, format } from 'date-fns';
import { notificationType } from '@prisma/client';
import { channel } from 'diagnostics_channel';
import { PrismaService } from 'src/prisma/prisma.service';

interface Client {
  UserID: string;
  socket: Socket;
}

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Authorization', 'X-Custom-Header'],
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  clients: Client[] = [];

  constructor(
    private readonly socketService: SocketService,
    private readonly notificationService: NotificationService,
    private readonly prisma: PrismaService
  ) { }

  addUser(UserID: string, socket: Socket) {
    // Check if the user already exists
    const existingClient = this.clients.find(c => c.UserID === UserID);
    if (!existingClient && UserID) {
      this.clients.push({ UserID, socket });
    }
  }

  handleConnection(client: Socket) {
    const UserId = client.handshake.query.userId as string;
    this.addUser(UserId, client);
    console.log("Client connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    console.log("Client disconnected:", client.id);

    // Find and remove the client
    this.clients = this.clients.filter(c => c.socket.id !== client.id);
  }

  @SubscribeMessage('new-appointment')
  async create(@MessageBody() appointment: any) {
    try {
      const recipient = this.clients.find(c => c.UserID === appointment.DoctorID);
      if (recipient) {
        const Message = `${appointment.Patient.FirstName} ${appointment.Patient.LastName} has requested a new appointment`;
        const notification = await this.notificationService.create({
          UserID: appointment.DoctorID,
          Message,
          NotificationType: notificationType.newAppointment,
        });

        const message = {
          patientName: `${appointment.Patient.FirstName} ${appointment.Patient.LastName}`,
          date: format(notification.CreatedAt, "yyyy-MM-dd"),
          time: format(notification.CreatedAt, "hh:mm a"),
          message: Message,
          reason: appointment.Note,
          age: differenceInYears(new Date(), notification.DateOfBirth),
          appointmentId: appointment.AppointmentID,
          appointmentDate: format(appointment.AppointmentDate, "yyyy/MM/dd"),
          appointmentTime: format(addHours(appointment.AppointmentTime, 1), "hh:mm a"),
          doctorId: appointment.DoctorID,
        };
        recipient.socket.emit('new-appointment', { message });
      }
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('notification')
  async appointmentNotification(@MessageBody() notification: any) {
    const recipient = this.clients.find(c => c.UserID === notification.UserID);
    if (!recipient) return;

    try {
      const storedNotification = await this.notificationService.create({
        UserID: notification.UserID,
        Message: notification.message,
        NotificationType: notification.notificationType,
      });
      recipient.socket.emit('notification', { message: storedNotification, appointment: notification.appointment });
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('new-videocall')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }

  @SubscribeMessage('receive-message')
  onReceiveMessage(@MessageBody() message: { senderId: string; text: string; timestamp: string; channelId: string }) {
    console.log('Received message event on server:', message);
  }

  @SubscribeMessage('send-message')
  async handleMessage(@MessageBody() message: { sender: string; recipientId: string; text: string; timestamp: string; channelId: string, content: string }) {
    console.log(message)
    const roomId = message.channelId;
    console.log(roomId)

    try {

      const channel = await this.prisma.chatChannel.findUnique({
        where: {
          ChannelID: roomId
        }
      })


      const chatMessage = await this.prisma.chatMessage.create({
        data: {
          ChannelID: roomId,
          SenderID: message.sender,
          Content: message.text,
          MediaUrl: message.content,
          SentAt: new Date(message.timestamp)
        }
      })

      console.log(chatMessage)

      this.server.emit('receive-message', {
        chatId: chatMessage.ChatID,
        sender: message.sender,
        text: message.text,
        content: chatMessage.MediaUrl,
        timestamp: message.timestamp,
        channelId: message.channelId
      });

    } catch (error) {

    }





  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() { userId, roomId }: { userId: string; roomId: string }) {
    const client = this.clients.find(c => c.UserID === userId);
    if (client) {
      client.socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    }
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@MessageBody() { userId, roomId }: { userId: string; roomId: string }) {
    const client = this.clients.find(c => c.UserID === userId);
    if (client) {
      client.socket.leave(roomId);
      console.log(`User ${userId} left room ${roomId}`);
    }
  }

  @SubscribeMessage('broadcast-message')
  handleBroadcastMessage(@MessageBody() { roomId, text }: { roomId: string; text: string }) {
    this.server.to(roomId).emit('room-message', text);
  }
}
