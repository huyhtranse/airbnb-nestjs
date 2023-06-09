import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { NguoiDung } from '@prisma/client'
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto, LogInUserDto, SignUpDto, SignUpUserDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LogInUserDto })
  @Post('/login')
  logInUser(@Body() body: LogInDto): Promise<NguoiDung> {
    try {
      const { email, password } = body;

      return this.authService.logInUser(email, password);
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @ApiBody({ type: SignUpUserDto })
  @Post('/signup')
  async signUpUser(
    @Body() body: SignUpDto,
  ): Promise<NguoiDung> {
    try {
      const { name, email, password } = body;

      return await this.authService.signUpUser(name, email, password);
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
