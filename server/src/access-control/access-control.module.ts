import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';

@Module({
  providers: [AccessControlService]
})
export class AccessControlModule {}
