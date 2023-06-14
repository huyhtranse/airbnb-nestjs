import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  prisma = new PrismaClient();

  async logInUser(email: string, mat_khau: string): Promise<any> {
    const user: any = await this.prisma.users.findFirst({ where: { email } });

    if (user !== null) {
      
      if (user?.mat_khau === mat_khau) {
        const token = this.jwtService.sign(
          { data: user },
          { secret: this.config.get('SECRET_KEY'), expiresIn: '7d' },
        );

        return {
          statusCode: 200,
          payload: { user },
          message: "Đăng nhập thành công",
          token
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

  async signUpUser(ten: string, email: string, mat_khau: string): Promise<any> {
    const user = await this.prisma.users.findFirst({ where: { email } });

    if (!user) {
      const token = this.jwtService.sign(
        { data: user },
        { secret: this.config.get('SECRET_KEY'), expiresIn: '7d' },
      );
      const newUser = { ten, email, mat_khau };

      await this.prisma.users.create({ data: newUser })

      return {
        statusCode: 200,
        message: "Đang ký thành công!",
        token
      }
    } else {
      return {
        statusCode: 400,
        message: "Email đã tồn tại!"
      }
    }
  }
}

