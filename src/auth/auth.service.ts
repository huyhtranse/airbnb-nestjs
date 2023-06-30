import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async logIn(email: string, password: string) {
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
          statusCode: 200,
          payload: { user },
          message: 'Đăng nhập thành công',
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

  async signUp(ten: string, email: string, mat_khau: string) {
    const user = await this.prismaService.users.findFirst({ where: { email } });

    if (!user) {
      const token = this.jwtService.sign(
        { data: user },
        { secret: this.config.get('SECRET_KEY'), expiresIn: '7d' },
      );
      const newUser = { ten, email, mat_khau };

      await this.prismaService.users.create({ data: newUser });

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
