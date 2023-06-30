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
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body()
    createBookingDto: CreateBookingDto,
  ) {
    return await this.bookingService.create(createBookingDto);
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

  @Get('/:id/users')
  async bookingByUserId(@Param('id') id: string) {
    return await this.bookingService.bookingByUserId(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body()
    updateRoomDto: UpdateBookingDto,
  ) {
    return await this.bookingService.update(updateRoomDto, +id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.bookingService.delete(id);
  }
}
