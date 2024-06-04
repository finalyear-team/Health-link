import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import {RedisModule as redisModule} from '@nestjs-modules/ioredis';

@Module({
  imports: [
    redisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [RedisController],
  providers: [RedisService],
})
export class RedisModule {}
