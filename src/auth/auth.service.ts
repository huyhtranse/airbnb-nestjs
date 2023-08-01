import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogInDto, SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async logIn(logInDto: LogInDto) {
    const { email, password } = logInDto;
    const user: any = await this.prismaService.users.findFirst({
      where: { email },
    });

    if (user !== null) {
      if (user?.password === password) {
        const token = this.jwtService.sign(
          { data: user },
          { secret: this.config.get('SECRET_KEY'), expiresIn: '7d' },
        );

        return {
          payload: { user },
          token,
        };
      } else {
        return {
          statusCode: 400,
          message: 'Mật khẩu không đúng!',
        };
      }
    } else {
      return {
        statusCode: 400,
        content: 'Tài khoản không tồn tại!',
      };
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;
    const user = await this.prismaService.users.findFirst({ where: { email } });

    if (!user) {
      const token = this.jwtService.sign(
        { data: user },
        { secret: this.config.get('SECRET_KEY'), expiresIn: '7d' },
      );

      await this.prismaService.users.create({ data: signUpDto });

      return {
        statusCode: 200,
        message: 'Đang ký thành công!',
        token,
      };
    } else {
      return {
        statusCode: 400,
        message: 'Email đã tồn tại!',
      };
    }
  }
}
