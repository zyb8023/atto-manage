import {
  Controller,
  Get,
  Headers,
  Inject,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CommonRes } from 'src/CommnRes';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { WINSTON_LOGGER_TOKEN } from 'src/winston/winston.module';
import { MyLogger } from 'src/winston/MyLogger';
import { LoginGuard } from 'src/guards/login.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(WINSTON_LOGGER_TOKEN)
  private myLogger: MyLogger;

  @Get('allKeys')
  async getAllKeys() {
    const res = await this.ordersService.getAllCacheKeys();
    return CommonRes.OK('ok', res);
  }

  @Get('testJwt')
  setTestJwt(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) resp: Response,
  ) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify<{ count: number }>(token);
        const newToken: string = this.jwtService.sign({
          count: data.count + 1,
        });
        resp.setHeader('token', newToken);
        return CommonRes.OK('ok', 'this is test Jwt');
      } catch (error) {
        this.myLogger.error(error, 'testJwt');
        throw new UnauthorizedException();
      }
    }
    const token: string = this.jwtService.sign({ count: 1 });
    resp.setHeader('token', token);
    return CommonRes.OK('ok', 'this is test Jwt');
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  testLogin() {
    return CommonRes.OK('操作成功！', 'aaaa');
  }
}
