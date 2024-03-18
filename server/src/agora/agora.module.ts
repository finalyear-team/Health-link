import { Module } from '@nestjs/common';
import { AgoraService } from './agora.service';

@Module({
  providers: [AgoraService]
})
export class AgoraModule {}
