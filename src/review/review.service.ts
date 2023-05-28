import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  private prisma: PrismaClient

  async createReview(data: Prisma.BinhLuanCreateInput) {
    const res = await this.prisma.binhLuan.create({ data });

    if (res) {
      return {
        statusCode: 200,
        payload: res,
      };
    } else {
      return {
        statusCode: 400,
        message: 'Bình luận thất bại',
      };
    }
  }

  async getReviews(roomId: number) {
    const reviews = await this.prisma.binhLuan.findMany({
      where: { binh_luan_id: roomId },
    });
    if (reviews.length > 0) {
      return {
        statusCode: 200,
        content: reviews,
      };
    } else
      return {
        statusCode: 404,
        content: 'Không có bình luận',
      };
  }
}
