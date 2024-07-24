import { Global, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Global()
@Module({
  providers: [SocketGateway, SocketService, PrismaService, NotificationService, PrismaService],
  exports: [SocketGateway, SocketService]
})
export class SocketModule { }
