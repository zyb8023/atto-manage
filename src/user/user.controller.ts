import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { WINSTON_LOGGER_TOKEN } from 'src/winston/winston.module';
import { MyLogger } from 'src/winston/MyLogger';
import { CommonRes } from 'src/CommnRes';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private myLogger: MyLogger;

  @Inject(JwtService)
  private jwtServer: JwtService;

  /**
   * 注册
   */
  @Post('register')
  async register(@Body() user: RegisterDto) {
    this.myLogger.log(JSON.stringify(user), UserController.name);
    const res = await this.userService.register(user);
    return CommonRes.OK('操作成功！', res);
  }

  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) resp: Response,
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = this.jwtServer.sign({
        user: { id: foundUser.id, username: foundUser.username },
      });
      resp.setHeader('token', token);
      return;
    }
    return '登录失败！';
  }

  @Get('init')
  async initData() {
    await this.userService.initData();
    return CommonRes.OK('操作成功！', '初始化成功!');
  }

  @Post('sessionLogin')
  async sessionLogin(@Body() user: LoginDto, @Session() session) {
    const result = await this.userService.login(user);
    if (result) {
      session.user = { userName: user.userName };
      return CommonRes.OK('登录成功！', result);
    } else {
      return CommonRes.Error();
    }
  }
}
