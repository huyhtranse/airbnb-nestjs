import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
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
    return await this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  async bookings() {
    return await this.bookingService.bookings();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async bookingById(@Param('id') id: string) {
    return await this.bookingService.bookingById(id);
  }

  @Get('/user/:id')
  async bookingByUserId(@Param('id') id: string) {
    return await this.bookingService.bookingByUserId(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async update(
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
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteBooking(@Param('id') id: string) {
    return await this.bookingService.deleteBooking(id);
  }
}
