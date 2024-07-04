import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { logConfig, getConfig } from './config';
import { WinstonModule } from './winston/winston.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis/redis.module';
import { OrdersModule } from './orders/orders.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { join } from 'path';

const config = getConfig();

const entitiesPaths = [join(__dirname, './', '**', '*.entity.{ts,js}')];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      load: [getConfig], // 加载配置文件
    }),
    WinstonModule.forRoot({
      level: config.logger.level,
      ...logConfig,
    }),
    TypeOrmModule.forRoot({
      ...config.mysql,
      entities: entitiesPaths,
    }),
    RedisModule.forRoot({
      ...config.redis,
    }),
    JwtModule.register({
      global: true,
      secret: config?.jwt?.secret,
      signOptions: {
        expiresIn: config?.jwt?.expiresIn,
      },
    }),
    OrdersModule,
    UserModule,
  ],
})
export class AppModule {}
