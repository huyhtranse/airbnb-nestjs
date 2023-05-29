import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ReviewService {
  prisma = new PrismaClient();

  async createReview(data: {
    noi_dung: string;
    sao_binh_luan: string;
    ngay_binh_luan: string;
    nguoi_dung_id: number;
    phong_id: number;
  }): Promise<any> {
    const review = await this.prisma.binhLuan.create({
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
    const resuft = await this.prisma.binhLuan.findMany({
      where: { binh_luan_id: +id },
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
    const resuft = await this.prisma.binhLuan.findMany({
      where: {
        phong_id: +id,
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
    const reviews = await this.prisma.binhLuan.findMany();
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
      noi_dung: string;
      sao_binh_luan: string;
      ngay_binh_luan: string;
      nguoi_dung_id: number;
      phong_id: number;
    },
    id: number,
  ): Promise<any> {
    const checkId = await this.prisma.binhLuan.findFirst({
      where: { binh_luan_id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 204,
        content: 'Không tìm thấy binh luan',
      };
    } else {
      const resuft = await this.prisma.binhLuan.update({
        data,
        where: {
          binh_luan_id: +id,
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
    const checkId = await this.prisma.binhLuan.findFirst({
      where: { binh_luan_id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id bình luận',
      };
    } else {
      const resuft = await this.prisma.binhLuan.delete({
        where: {  binh_luan_id: +id },
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
