import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Location')
@Injectable()
export class LocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLocation(createLocationDto: CreateLocationDto) {
    const location = await this.prismaService.locations.create({
      data: createLocationDto,
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
    return await this.prismaService.locations.findMany();
  }

  async locationById(id: number) {
    const location = await this.prismaService.locations.findMany({
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

  async update(updateLocationDto: UpdateLocationDto, id: number) {
    const checkId = await this.prismaService.locations.findFirst({
      where: { id: id },
    });
    if (checkId == null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy id vị trí',
      };
    } else {
      const location = await this.prismaService.locations.update({
        data: updateLocationDto,
        where: {
          id: +id,
        },
      });
      if (location) {
        return location;
      } else {
        return {
          statusCode: 404,
          content: 'Cập nhật vị trí thất bại',
        };
      }
    }
  }

  async deleteLocation(id: string) {
    const location = await this.prismaService.locations.findFirst({
      where: { id: +id },
    });

    if (location === null) {
      return {
        statusCode: 404,
        content: 'Không tìm thấy vị trí',
      };
    } else {
      const res = await this.prismaService.locations.delete({
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
    const viTri = await this.prismaService.locations.findFirst({
      where: {
        id: +id,
      },
    });

    if (viTri !== null) {
      const res = await this.prismaService.locations.update({
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
