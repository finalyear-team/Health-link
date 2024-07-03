import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { Server, Socket } from 'socket.io';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Appointments, notificationType } from '@prisma/client';
import { NotificationService } from 'src/notification/notification.service';
import { addHours, format, parse } from 'date-fns';

interface Client {
  UserID: string
  socket: Socket
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

  constructor(private readonly socketService: SocketService, private readonly notificationService: NotificationService) { }
  addUser(UserID: string, socket: Socket) {
    if (UserID)
      this.clients.push({ UserID, socket });
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
    const UserId = client.handshake.query.userId as string
    this.addUser(UserId, client)
  }
  handleDisconnect(client: any) {
    console.log("disconnected")
  }



  @SubscribeMessage('new-appointment')
  async create(@MessageBody() appointment: any) {
    try {
      const recipient = this.clients.find(c => c.UserID === appointment.DoctorID);
      if (recipient) {
        console.log("recipient")
        console.log(appointment)

        const Message = `new appointment request by ${appointment.Patient.FirstName} ${appointment.Patient.LastName} for ${format(appointment.AppointmentDate, 'EEE MMM yyyy')}  at ${format(addHours(appointment.AppointmentTime, 1), "hh:mm a")}`

        console.log(Message)

        const notification = await this.notificationService.create({
          UserID: appointment.DoctorID,
          Message,
          NotificationType: notificationType.newAppointment
        })

        console.log(notification)

        recipient.socket.emit('new-appointment', { appointment, Message })
      } else {
        console.log(`User ${appointment.DoctorID} is not connected.`);
      }
    } catch (error) {
      console.log(error)

    }
  }

  @SubscribeMessage('')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('upcoming-appointments')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
