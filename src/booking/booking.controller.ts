import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Put,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class Booking {
  @ApiProperty({
    description: 'ma_phong',
    type: Number,
  })
  ma_phong: string;

  @ApiProperty({
    description: 'ngay_den',
    type: String,
  })
  ngay_den: string;

  @ApiProperty({
    description: 'ngay_di',
    type: String,
  })
  ngay_di: string;

  @ApiProperty({
    description: 'so_luong_khach',
    type: Number,
  })
  so_luong_khach: number;

  @ApiProperty({
    description: 'nguoi_dung_id',
    type: Number,
  })
  nguoi_dung_id: number;

  @ApiProperty({
    description: 'phong_id',
    type: Number,
  })
  phong_id: number;
}

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @ApiBody({
    type: Booking,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createBooking(
    @Body()
    body: {
      ma_phong: string;
      ngay_den: string;
      ngay_di: string;
      so_luong_khach: number;
      nguoi_dung_id: number;
      phong_id: number;
    },
  ): Promise<any> {
    try {
      return await this.bookingService.createBooking(body);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @Get()
  async bookings(): Promise<any> {
    try {
      return await this.bookingService.bookings();
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getBookingWithId(@Param('id') id: string): Promise<any> {
    try {
      return await this.bookingService.bookingById(id);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @Get('/user/:id')
  async getBookingWithIdUser(@Param('id') id: string): Promise<any> {
    try {
      return await this.bookingService.bookingByUser(id);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBody({
    type: Booking,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async updateBooking(
    @Param('id') id: number,

    @Body()
    body: {
      ma_phong: string;
      ngay_den: string;
      ngay_di: string;
      so_luong_khach: number;
      nguoi_dung_id: number;
      phong_id: number;
    },
  ): Promise<any> {
    const {
      ma_phong,
      ngay_den,
      ngay_di,
      so_luong_khach,
      nguoi_dung_id,
      phong_id,
    } = body;
    try {
      return await this.bookingService.updateBooking(
        {
          ma_phong,
          ngay_den,
          ngay_di,
          so_luong_khach,
          nguoi_dung_id,
          phong_id,
        },
        id,
      );
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteBooking(@Param('id') id: string): Promise<any> {
    try {
      return await this.bookingService.deleteBooking(id);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }
}
