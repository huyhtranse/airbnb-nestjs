import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Review')
@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.prismaService.reviews.create({
      data: createReviewDto,
    });
  }

  async reviewById(id: string) {
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

  async reviewByRoomId(id: number) {
    return await this.prismaService.reviews.findMany({
      where: {
        id,
      },
    });
  }

  async reviews() {
    return await this.prismaService.reviews.findMany();
  }

  async update(
    updateReviewDto: UpdateReviewDto,
    id: number,
  ) {
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
        data: updateReviewDto,
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

  async delete(id: string) {
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
