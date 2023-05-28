import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocationService {
  prisma = new PrismaClient();

  async createLocation(data: {
    ten_vi_tri: string;
    binh_luan: string;
    quoc_gia: string;
    hinh_anh: string;
  }): Promise<any> {
    const location = await this.prisma.viTri.create({
      data,
    });
    if (location) {
      return {
        statusCode: 200,
        payload: location,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Tạo vị trí thất bại',
      };
    }
  }

  async getAllLocation() {
    const locations = await this.prisma.viTri.findMany();
    if (locations.length > 0) {
      return {
        statusCode: 200,
        payload: locations,
      };
    } else
      return {
        statusCode: 404,
        content: 'Không tìm thấy vị trí',
      };
  }

  async getLocationById(id: string): Promise<any> {
    const date = new Date();
    const location = await this.prisma.viTri.findMany({
      where: {
        vi_tri_id: +id,
      },
    });
    if (location.length > 0) {
      return {
        statusCode: 200,
        content: location,
        dateTime: date,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy vị trí',
        dateTime: date,
      };
    }
  }

  async updateLocation(
    data: {
      ten_vi_tri: string;
      binh_luan: string;
      quoc_gia: string;
      hinh_anh: string;
    },
    id: number,
  ): Promise<any> {
    const date = new Date();
    const checkId = await this.prisma.viTri.findFirst({
      where: { vi_tri_id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id vị trí',
        dateTime: date,
      };
    } else {
      const resuft = await this.prisma.viTri.update({
        data,
        where: {
          vi_tri_id: +id,
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
          content: 'Cập nhật vị trí thất bại',
          dateTime: date,
        };
      }
    }
  }

  async deleteLocation(id: string): Promise<any> {
    const location = await this.prisma.viTri.findFirst({
      where: { vi_tri_id: +id },
    });

    if (location === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy vị trí',
      };
    } else {
      const res = await this.prisma.viTri.delete({
        where: { vi_tri_id: +id },
      });

      if (res) {
        return {
          statusCode: 200,
          content: 'Xoá vị trí thành công',
        };
      } else {
        return {
          statusCode: 404,
          content: 'Xoá vị trí thất bại',
        };
      }
    }
  }

  async postImage(id: string, filename: string) {
    const viTri = await this.prisma.viTri.findFirst({
      where: {
        vi_tri_id: +id,
      },
    });

    if (viTri !== null) {
      const res = await this.prisma.viTri.update({
        data: {
          vi_tri_id: +id,
          hinh_anh: filename,
        },
        where: {
          vi_tri_id: +id,
        },
      });

      return {
        statusCode: 200,
        message: 'Tải ảnh vị trí thành công ',
        payload: res,
      };
    } else {
      return {
        statusCode: 404,
        message: 'Vị trí không tồn tại',
      };
    }
  }
}