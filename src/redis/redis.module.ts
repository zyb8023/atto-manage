import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

export const REDIS_TOKEN = 'REDIS_CLIENT';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_TOKEN,
          useFactory() {
            return new Redis(options);
          },
        },
      ],
      exports: [REDIS_TOKEN],
    };
  }
}
