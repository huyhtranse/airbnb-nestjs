import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';

@ApiTags("Review")
@Injectable()
export class ReviewService {
  prisma = new PrismaClient();

  async createReview(data: {
    content: string;
      star: string;
      createdAt: string;
      userId: number;
      roomId: number;
  }): Promise<any> {
    const review = await this.prisma.review.create({
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
    const resuft = await this.prisma.review.findMany({
      where: { id: +id },
    });
    if (resuft.length > 0) {
      return {
        statusCode: 200,
        content: resuft,
      };
    } else {
      return {
        statusCode: 204,
        content: 'Không tìm thấy bình luận',
      };
    }
  }

  async reviewByRoomId(id: number): Promise<any> {
    const date = new Date();
    const resuft = await this.prisma.review.findMany({
      where: {
        id: +id,
      },
    });
    if (resuft.length > 0) {
      return {
        statusCode: 200,
        content: resuft,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy bình luận',
      };
    }
  }

  async reviews(): Promise<any> {
    const reviews = await this.prisma.review.findMany();
    if (reviews.length > 0) {
      return {
        statusCode: 200,
        content: reviews,
      };
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
    const checkId = await this.prisma.review.findFirst({
      where: { id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 204,
        content: 'Không tìm thấy binh luan',
      };
    } else {
      const resuft = await this.prisma.review.update({
        data,
        where: {
          id: +id,
        },
      });
      if (resuft) {
        return {
          statusCode: 200,
          content: resuft,
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
    const checkId = await this.prisma.review.findFirst({
      where: { id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id bình luận',
      };
    } else {
      const resuft = await this.prisma.review.delete({
        where: {  id: +id },
      });
      if (resuft) {
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
