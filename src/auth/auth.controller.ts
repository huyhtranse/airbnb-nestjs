import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LogInDto,
  LogInUserDto,
  SignUpDto,
  SignUpUserDto,
} from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LogInUserDto })
  @Post('/login')
  logInUser(@Body() body: LogInDto): Promise<Users> {
    const { email, password } = body;

    return this.authService.logInUser(email, password);
  }

  @ApiBody({ type: SignUpUserDto })
  @Post('/signup')
  async signUpUser(@Body() body: SignUpDto): Promise<Users> {
    const { name, email, password } = body;

    return await this.authService.signUpUser(name, email, password);
  }
}
