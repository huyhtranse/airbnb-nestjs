import {
  Controller,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LogInDto,
  SignUpDto,
} from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  logInUser(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @HttpCode(200)
  @Post('/signup')
  async signUpUser(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
