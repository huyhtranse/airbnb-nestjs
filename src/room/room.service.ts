import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { Room } from './interfaces/room.interface';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('Room')
@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRoom(room: Room): Promise<any> {
    const location = await this.prismaService.locations.findFirst({
      where: {
        id: room.locationId,
      },
    });
    if (location !== null) {
      return await this.prismaService.rooms.create({
        data: room,
      });
    } else {
      throw new ConflictException('Location does not exit');
    }
  }

  async rooms(): Promise<any> {
    return await this.prismaService.rooms.findMany();
  }

  async roomById(id: number) {
    const room = await this.prismaService.rooms.findMany({
      where: { id: +id },
    });
    if (room.length > 0) {
      return {
        statusCode: 200,
        payload: room,
      };
    } else {
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'No rooms',
      };
    }
  }

  async roomByLocation(locationId: number): Promise<any> {
    const room = await this.prismaService.rooms.findMany({
      where: { id: +locationId },
    });

    if (room !== null) {
      return room;
    } else {
      return {
        statusCode: 204,
        message: 'No rooms',
      };
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<any> {
    const room = await this.prismaService.rooms.findFirst({
      where: { id: +id },
    });

    if (room == null) {
      return {
        statusCode: 404,
        content: 'Room Not Found',
      };
    } else {
      const room = await this.prismaService.rooms.update({
        data: updateRoomDto,
        where: {
          id: +id,
        },
      });
      if (room) {
        return {
          statusCode: 200,
          content: room,
        };
      } else {
        return {
          statusCode: 404,
          content: 'Cập nhật phòng thất bại',
        };
      }
    }
  }

  async remove(id: number) {
    const room = await this.prismaService.rooms.findFirst({
      where: { id: +id },
    });

    if (room === null) {
      return {
        statusCode: 204,
        content: 'Room Not Found',
      };
    } else {
      const res = await this.prismaService.rooms.delete({
        where: { id: +id },
      });

      if (res) {
        return {
          statusCode: 200,
          message: 'Xoá phòng thành công.',
        };
      } else {
        return {
          statusCode: 404,
          message: 'Xoá phòng thất bại.',
        };
      }
    }
  }

  async updateImage(id: string, path: string) {
    const room = await this.prismaService.rooms.findFirst({
      where: {
        id: +id,
      },
    });

    if (room === null) {
      return {
        statusCode: 404,
        message: 'Phòng không tồn tại',
      };
    } else {
      const room = await this.prismaService.rooms.update({
        data: {
          image: path,
        },
        where: {
          id: +id,
        },
      });

      return {
        statusCode: 200,
        message: 'Update ảnh thành công.',
        payload: room,
      };
    }
  }
}
