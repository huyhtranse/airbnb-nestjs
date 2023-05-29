import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BookingService {
  prisma = new PrismaClient();

  async createBooking(data: {
    ma_phong: string;
    ngay_den: string;
    ngay_di: string;
    so_luong_khach: number;
    nguoi_dung_id: number;
    phong_id: number;
  }): Promise<any> {
    const date = new Date();
    const resuft = await this.prisma.datPhong.create({
      data,
    });
    if (resuft) {
      return {
        statusCode: 200,
        content: resuft,
        dateTime: date,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Đặt phòng thất bại',
        dateTime: date,
      };
    }
  }

  async bookings(): Promise<any> {
    const date = new Date();
    const resuft = await this.prisma.datPhong.findMany();
    if (resuft.length > 0) {
      return {
        statusCode: 200,
        content: resuft,
        dateTime: date,
      };
    } else
      return {
        statusCode: 404,
        content: 'Chưa có booking',
        dateTime: date,
      };
  }

  async bookingById(id: string): Promise<any> {
    const date = new Date();
    const resuft = await this.prisma.datPhong.findMany({
      where: { dat_phong_id: +id },
    });
    if (resuft.length > 0) {
      return {
        statusCode: 200,
        content: resuft,
        dateTime: date,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy phòng đã đặt',
        dateTime: date,
      };
    }
  }

  async bookingByUser(id: string): Promise<any> {
    const date = new Date();
    const resuft = await this.prisma.datPhong.findMany({
      where: {
        nguoi_dung_id: +id,
      },
    });
    if (resuft.length > 0) {
      return {
        statusCode: 200,
        content: resuft,
        dateTime: date,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy phòng đã đặt với mã người dùng bạn cung cấp',
        dateTime: date,
      };
    }
  }

  async updateBooking(
    data: {
      ma_phong: string;
      ngay_den: string;
      ngay_di: string;
      so_luong_khach: number;
      nguoi_dung_id: number;
      phong_id: number;
    },
    id: number,
  ): Promise<any> {
    const date = new Date();
    const checkId = await this.prisma.datPhong.findFirst({
      where: { dat_phong_id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id đặt phòng',
        dateTime: date,
      };
    } else {
      const resuft = await this.prisma.datPhong.update({
        data,
        where: {
          dat_phong_id: +id,
        },
      });
      if (resuft) {
        return {
          statusCode: 200,
          content: resuft,
          dateTime: date,
        };
      } else {
        return {
          statusCode: 404,
          content: 'Cập nhật đặt phòng thất bại',
          dateTime: date,
        };
      }
    }
  }

  async deleteBooking(id: string): Promise<any> {
    const date = new Date();
    const checkId = await this.prisma.datPhong.findFirst({
      where: { dat_phong_id: +id },
    });
    if (checkId === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id đặt phòng',
        dateTime: date,
      };
    } else {
      const resuft = await this.prisma.datPhong.delete({
        where: { dat_phong_id: +id },
      });
      if (resuft) {
        return {
          statusCode: 200,
          content: 'Xoá đặt phòng thành công',
          dateTime: date,
        };
      } else {
        return {
          statusCode: 404,
          content: 'Xoá đặt phòng thất bại',
          dateTime: date,
        };
      }
    }
  }
}
