import { HttpException, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_TOKEN } from 'src/redis/redis.module';

@Injectable()
export class OrdersService {
  @Inject(REDIS_TOKEN)
  private redisConnect: Redis;

  getAllCacheKeys() {
    try {
      return this.redisConnect.get('zhao');
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
