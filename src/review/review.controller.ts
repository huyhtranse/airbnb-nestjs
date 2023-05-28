import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  // @Post('/post-review/')
  // async createReview(
  //   @Headers('authorization') auth: string,
  //   @Body() body: CreateReviewDto
  // ) {
  //   try {
  //     return await this.reviewService.createReview(body)
  //   } catch (error) {
  //     throw new HttpException("Internal Server Error", 500)
  //   }
  // }

  @Get('/get-reviews/:roomId')
  async getReviews(@Param('roomId') roomId: string) {
    try {
      return await this.reviewService.getReviews(+roomId);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }
}
