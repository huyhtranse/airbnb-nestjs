import { ConflictException, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/interfaces/user.interface';

@ApiTags('User')
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const { email } = user;
    const userRes = await this.prismaService.users.findFirst({
      where: { email },
    });

    if (userRes === null) {
      return await this.prismaService.users.create({ data: user });
    } else {
      throw new ConflictException('Email already exits')
    }
  }

  async users() {
     await this.prismaService.users.findMany();
  }

  async userByID(userId: number) {
    return await this.prismaService.users.findMany({
      where: {
        id: userId,
      },
    });
  }

  async userByName(name: string) {
    const users = await this.prismaService.users.findMany({
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
  ) {
    const checkId = await this.prismaService.users.findFirst({
      where: { id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 204,
        content: 'Không tìm thấy id người dùng',
      };
    } else {
      const res = await this.prismaService.users.update({
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

  async deleteUser(id: string) {
    const checkId = await this.prismaService.users.findFirst({
      where: { id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id người dùng',
      };
    } else {
      const res = await this.prismaService.users.delete({
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
    const user = await this.prismaService.users.findFirst({
      where: { id: +userId },
    });

    if (user === null) {
      return {
        statusCode: 204,
        message: 'Phòng không tồn tại',
      };
    } else {
      const user = await this.prismaService.users.update({
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
