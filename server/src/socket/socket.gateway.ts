import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';

@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('new-appiontment')
  create(@MessageBody() createSocketDto: CreateSocketDto) {
    return this.socketService.create(createSocketDto);
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
