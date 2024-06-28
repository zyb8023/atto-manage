import { TypeOrmModuleOptions } from '@nestjs/typeorm';

declare namespace Config {
  interface IServer {
    host: string;
    port?: number;
  }

  interface IMysql extends TypeOrmModuleOptions {}

  interface IRedis {
    enable: boolean;
    host: string;
    port: number;
    enableAuth: boolean;
  }

  type TLogLever = 'info' | 'debug';

  interface ILogger {
    level: TLogLever;
  }

  interface IAppConfig {
    server: IServer;
    mysql: IMysql;
    redis: IRedis;
    logger: ILogger;
  }
}
