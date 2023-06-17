import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaClient } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Injectable()
export class BookingService {
  prisma = new PrismaClient();

  async createBooking(data: {
    roomName: string;
    checkIn: string;
    checkOut: string;
    guest: number;
    userId: number;
    roomId: number;
  }): Promise<any> {
    const res = await this.prisma.bookings.create({
      data,
    });
    if (res) {
      return {
        statusCode: 200,
        content: res,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Đặt phòng thất bại',
      };
    }
  }

  async bookings(): Promise<any> {
    const bookings = await this.prisma.bookings.findMany();
    if (bookings.length > 0) {
      return bookings;
    } else
      return {
        statusCode: 404,
        content: 'Chưa có booking',
      };
  }

  async bookingById(id: string): Promise<any> {
    const res = await this.prisma.bookings.findMany({
      where: { id: +id },
    });
    if (res.length > 0) {
      return {
        statusCode: 200,
        content: res,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy phòng đã đặt',
      };
    }
  }

  async bookingByUser(id: string): Promise<any> {
    const res = await this.prisma.bookings.findMany({
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

  async updateBooking(
    data: {
      roomName: string;
      checkIn: string;
      checkOut: string;
      guest: number;
      userId: number;
      roomId: number;
    },
    id: number,
  ): Promise<any> {
    const checkId = await this.prisma.bookings.findFirst({
      where: { id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id đặt phòng',
      };
    } else {
      const res = await this.prisma.bookings.update({
        data,
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

  async deleteBooking(id: string): Promise<any> {
    const checkId = await this.prisma.bookings.findFirst({
      where: { id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id đặt phòng',
      };
    } else {
      const res = await this.prisma.bookings.delete({
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
