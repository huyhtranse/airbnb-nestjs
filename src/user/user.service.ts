import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  prisma = new PrismaClient();

  async createUser(user: {
    ten: string;
    email: string;
    mat_khau: string;
    dien_thoai: string;
    ngay_sinh: string;
    gioi_tinh: string;
    role: string;
  }): Promise<any> {
    const { email } = user;
    const userRes = await this.prisma.users.findFirst({ where: { email } });

    if (userRes === null) {
      const res = await this.prisma.users.create({ data: user });
      return {
        statusCode: 200,
        message: 'Tạo người dùng thành công',
        payload: res,
      };
    } else {
      return {
        statusCode: 400,
        message: 'Yêu cầu không hợp lệ!',
        content: 'Email đã tồn tại !',
      };
    }
  }

  async users(): Promise<any> {
    const users = await this.prisma.users.findMany();

    if (users.length > 0) {
      return {
        statusCode: 200,
        content: users,
      };
    } else
      return {
        statusCode: 204,
        content: 'Khong tim thay nguoi dung',
      };
  }

  async userByID(id: string): Promise<any> {
    const res = await this.prisma.users.findMany({
      where: {
        id: +id,
      },
    });
    if (res.length > 0) {
      return {
        statusCode: 200,
        content: res,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id người dùng',
      };
    }
  }

  async userByName(name: string): Promise<any> {
    const users = await this.prisma.users.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    if (users.length > 0) {
      return {
        statusCode: 200,
        payload: users,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy tên người dùng',
      };
    }
  }

  async updateUser(
    data: {
      ten: string;
      email: string;
      mat_khau: string;
      dien_thoai: string;
      ngay_sinh: string;
      gioi_tinh: string;
      role: string;
    },
    id: number,
  ): Promise<any> {
    const checkId = await this.prisma.users.findFirst({
      where: { id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 204,
        content: 'Không tìm thấy id người dùng',
      };
    } else {
      const res = await this.prisma.users.update({
        data,
        where: {
          id: +id,
        },
      });
      if (res) {
        return {
          statusCode: 200,
          content: res,
        };
      } else {
        return {
          statusCode: 404,
          content: 'Cập nhật người dùng thất bại',
        };
      }
    }
  }

  async deleteUser(id: string): Promise<any> {
    const checkId = await this.prisma.users.findFirst({
      where: { id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id người dùng',
      };
    } else {
      const res = await this.prisma.users.delete({
        where: { id: +id },
      });
      if (res) {
        return {
          statusCode: 200,
          content: 'Xoá người thành công',
        };
      } else {
        return {
          statusCode: 404,
          content: 'Xoá người thất bại',
        };
      }
    }
  }

  async postAvatar(userId: string, path: string) {
    const user = await this.prisma.users.findFirst({
      where: { id: +userId },
    });

    if (user === null) {
      return {
        statusCode: 204,
        message: 'Phòng không tồn tại',
      };
    } else {
      const user = await this.prisma.users.update({
        data: {
          // hinh_anh: path,
        },
        where: {
          id: +userId,
        },
      });

      return {
        statusCode: 200,
        message: 'Update ảnh thành công.',
        payload: user,
      };
    }
  }
}

