import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body()
    createReviewDto: CreateReviewDto,
  ) {
    return await this.reviewService.create(createReviewDto);
  }

  @Get()
  async reviews() {
    return await this.reviewService.reviews();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async reviewById(@Param('id') id: string) {
    return await this.reviewService.reviewById(id);
  }

  @ApiBearerAuth()
  @Get('/:id/room')
  async reviewByRoomId(@Param('id') id: number) {
    return await this.reviewService.reviewByRoomId(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body()
    createReviewDto: CreateReviewDto,
  ) {
    return await this.reviewService.update(createReviewDto, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.reviewService.delete(id);
  }
}
