import { Controller } from '@nestjs/common';
import { VideoCallService } from './video-call.service';

@Controller('video-call')
export class VideoCallController {
  constructor(private readonly videoCallService: VideoCallService) {}
}
