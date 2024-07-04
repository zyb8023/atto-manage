import { Allow } from 'class-validator';

export class RegisterDto {
  @Allow()
  userName: string;

  @Allow()
  password: string;
}
