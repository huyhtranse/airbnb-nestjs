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
  Req,
  Headers,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReviewService } from './review.service';

class Review {
  @ApiProperty({
    description: 'ma_cong_viec',
    type: Number,
  })
  ma_cong_viec: number;

  @ApiProperty({
    description: 'ma_nguoi_binh_luan',
    type: Number,
  })
  ma_nguoi_binh_luan: number;

  @ApiProperty({
    description: 'ngay_binh_luan',
    type: String,
  })
  ngay_binh_luan: string;

  @ApiProperty({
    description: 'noi_dung',
    type: String,
  })
  noi_dung: number;

  @ApiProperty({
    description: 'sao_binh_luan',
    type: Number,
  })
  sao_binh_luan: number;

  @ApiProperty({
    description: 'id_phong',
    type: Number,
  })
  id_phong: number;
}

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBody({
    type: Review,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/post-review/')
  async createReview(
    @Body()
    body: {
      content: string;
      star: string;
      createdAt: string;
      userId: number;
      roomId: number;
    },
  ) {
    try {
      return await this.reviewService.createReview(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async reviews() {
    try {
      return await this.reviewService.reviews();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async reviewById(@Param('id') id: string) {
    try {
      return await this.reviewService.reviewById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @Get('/room/:id')
  async reviewByRoomId(@Param('id') id: number) {
    try {
      return await this.reviewService.reviewByRoomId(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBody({
    type: Review,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-review/:id')
  async updateReview(
    @Param('id') id: number,
    @Headers('authorization')
    @Body()
    body: {
      content: string;
      star: string;
      createdAt: string;
      userId: number;
      roomId: number;
    },
  ) {
    try {
      return await this.reviewService.updateReview(body, id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteReivew(@Param('id') id: string) {
    try {
      return await this.reviewService.deleteReivew(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
