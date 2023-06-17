import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Review')
@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReview(data: {
    content: string;
    star: string;
    createdAt: string;
    userId: number;
    roomId: number;
  }): Promise<any> {
    const review = await this.prismaService.reviews.create({
      data,
    });
    if (review) {
      return {
        statusCode: 200,
        content: review,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không thể bình luận',
      };
    }
  }

  async reviewById(id: string): Promise<any> {
    const res = await this.prismaService.reviews.findMany({
      where: { id: +id },
    });
    if (res.length > 0) {
      return {
        statusCode: 200,
        content: res,
      };
    } else {
      return {
        statusCode: 204,
        content: 'Không tìm thấy bình luận',
      };
    }
  }

  async reviewByRoomId(id: number): Promise<any> {
    const res = await this.prismaService.reviews.findMany({
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
        content: 'Không tìm thấy bình luận',
      };
    }
  }

  async reviews(): Promise<any> {
    const reviews = await this.prismaService.reviews.findMany();
    if (reviews.length > 0) {
      return reviews;
    } else
      return {
        statusCode: 204,
        content: 'Review not found.',
      };
  }

  async updateReview(
    data: {
      content: string;
      star: string;
      createdAt: string;
      userId: number;
      roomId: number;
    },
    id: number,
  ): Promise<any> {
    const checkId = await this.prismaService.reviews.findFirst({
      where: { id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 204,
        content: 'Không tìm thấy binh luan',
      };
    } else {
      const res = await this.prismaService.reviews.update({
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
          content: 'Cập nhật bình luận thất bại',
        };
      }
    }
  }

  async deleteReivew(id: string): Promise<any> {
    const checkId = await this.prismaService.reviews.findFirst({
      where: { id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id bình luận',
      };
    } else {
      const res = await this.prismaService.reviews.delete({
        where: { id: +id },
      });
      if (res) {
        return {
          statusCode: 200,
          content: 'Xoá comment thành công',
        };
      } else {
        return {
          statusCode: 404,
          content: 'Xoá comment thất bại',
        };
      }
    }
  }
}
