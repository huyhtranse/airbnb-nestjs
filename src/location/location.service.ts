import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaClient } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Location")
@Injectable()
export class LocationService {
  prisma = new PrismaClient();

  async createLocation(data: {
    ten_vi_tri: string;
    binh_luan: string;
    quoc_gia: string;
    hinh_anh: string;
  }): Promise<any> {
    const location = await this.prisma.locations.create({
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

  async locations() {
    const locations = await this.prisma.locations.findMany();
    if (locations.length > 0) {
      return locations
    } else
      return {
        statusCode: 404,
        content: 'Không tìm thấy vị trí',
      };
  }

  async getLocationById(id: string): Promise<any> {
    const location = await this.prisma.locations.findMany({
      where: {
        id: +id,
      },
    });
    if (location.length > 0) {
      return {
        statusCode: 200,
        content: location,
      };
    } else {
      return {
        statusCode: 404,
        content: 'Không tìm thấy vị trí',
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
    const checkId = await this.prisma.locations.findFirst({
      where: { id: +id },
    });
    if (checkId == null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id vị trí',
      };
    } else {
      const res = await this.prisma.locations.update({
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
          content: 'Cập nhật vị trí thất bại',

        };
      }
    }
  }

  async deleteLocation(id: string): Promise<any> {
    const location = await this.prisma.locations.findFirst({
      where: { id: +id },
    });

    if (location === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy vị trí',
      };
    } else {
      const res = await this.prisma.locations.delete({
        where: { id: +id },
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
    const viTri = await this.prisma.locations.findFirst({
      where: {
        id: +id,
      },
    });

    if (viTri !== null) {
      const res = await this.prisma.locations.update({
        data: {
          id: +id,
          image: filename,
        },
        where: {
          id: +id,
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