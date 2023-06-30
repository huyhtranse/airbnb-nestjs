import {
  Controller,
  Post,
  Body,
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

  @Post('/login')
  logInUser(@Body() logInDto: LogInDto) {
    const { email, password } = logInDto;

    return this.authService.logIn(email, password);
  }

  @Post('/signup')
  async signUpUser(@Body() signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;

    return await this.authService.signUp(name, email, password);
  }
}
