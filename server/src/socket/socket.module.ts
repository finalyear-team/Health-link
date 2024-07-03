import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [SocketGateway, SocketService, PrismaService, NotificationService],
})
export class SocketModule { }
