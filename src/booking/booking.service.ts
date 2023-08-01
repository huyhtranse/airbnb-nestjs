import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Booking')
@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    return await this.prismaService.bookings.create({
      data: createBookingDto,
    });
  }

  async bookings() {
    return await this.prismaService.bookings.findMany();
  }

  async bookingById(id: string) {
    const booking = await this.prismaService.bookings.findFirst({
      where: { id: +id },
    });
    if (booking !== null) {
      return booking;
    } else {
      throw new ConflictException('Booking does not exit');
    }
  }

  async bookingByUserId(id: string) {
    const res = await this.prismaService.bookings.findMany({
      where: {
        userId: +id,
      },
    });
    if (res.length > 0) {
      return {
        statusCode: 200,
        content: res,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy phòng đã đặt với mã người dùng bạn cung cấp',
      };
    }
  }

  async update(booking: UpdateBookingDto, id: number) {
    const checkId = await this.prismaService.bookings.findFirst({
      where: { id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id đặt phòng',
      };
    } else {
      const res = await this.prismaService.bookings.update({
        data: booking,
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
          content: 'Cập nhật đặt phòng thất bại',
        };
      }
    }
  }

  async delete(id: string) {
    const checkId = await this.prismaService.bookings.findFirst({
      where: { id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id đặt phòng',
      };
    } else {
      const res = await this.prismaService.bookings.delete({
        where: { id: +id },
      });
      if (res) {
        return {
          statusCode: 200,
          content: 'Xoá đặt phòng thành công',
        };
      } else {
        return {
          statusCode: 404,
          content: 'Xoá đặt phòng thất bại',
        };
      }
    }
  }
}
