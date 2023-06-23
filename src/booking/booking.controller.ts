import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createBooking(
    @Body()
    createBookingDto: CreateBookingDto,
  ) {
    try {
      return await this.bookingService.createBooking(createBookingDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async bookings() {
      return await this.bookingService.bookings();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async bookingById(@Param('id') id: string) {
    try {
      return await this.bookingService.bookingById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/user/:id')
  async bookingByUserId(@Param('id') id: string) {
    try {
      return await this.bookingService.bookingByUserId(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async updateBooking(
    @Param('id') id: number,

    @Body()
    body: {
      roomName: string;
      checkIn: string;
      checkOut: string;
      guest: number;
      userId: number;
      roomId: number;
    },
  ) {
    const { roomName, checkIn, checkOut, guest, userId, roomId } = body;
    try {
      return await this.bookingService.updateBooking(
        {
          roomName,
          checkIn,
          checkOut,
          guest,
          userId,
          roomId,
        },
        id,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteBooking(@Param('id') id: string) {
    try {
      return await this.bookingService.deleteBooking(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
