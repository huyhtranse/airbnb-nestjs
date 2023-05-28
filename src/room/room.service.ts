import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async createRoom(data: {
    ten_phong: string;
    khach: number;
    phong_ngu: number;
    giuong: number;
    phong_tam: number;
    mo_ta: string;
    gia_tien: number;
    may_giat: boolean;
    ban_la: boolean;
    tivi: boolean;
    dieu_hoa: boolean;
    wifi: boolean;
    do_xe: boolean;
    ho_boi: boolean;
    ban_ui: boolean;
    hinh_anh: string;
    vi_tri_id: number;
  }): Promise<any> {
    const viTri = await this.prisma.viTri.findFirst({
      where: {
        vi_tri_id: data.vi_tri_id,
      },
    });
    if (viTri !== null) {
      const room = await this.prisma.phong.create({
        data,
      });
      if (room) {
        return {
          statusCode: 200,
          payload: room,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Tạo phòng thất bại.',
        };
      }
    } else {
      return {
        statusCode: 404,
        content: 'Vị trí này không tồn tại.',
      };
    }
  }

  async rooms(): Promise<any> {
    const rooms = await this.prisma.phong.findMany();

    if (rooms.length > 0) {
      return {
        statusCode: HttpStatus.OK,
        payload: rooms,
      };
    } else {
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'No rooms',
      };
    }
  }

  async roomById(id: number) {
    const room = await this.prisma.phong.findMany({
      where: { phong_id: +id },
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
    const room = await this.prisma.phong.findMany({
      where: { vi_tri_id: +locationId },
    });

    if (room !== null) {
      return {
        statusCode: 200,
        payload: room,
      };
    } else {
      return {
        statusCode: 204,
        message: 'No rooms',
      };
    }
  }

  async updateRoomInfo(
    id: number,
    data: {
      ten_phong: string;
      khach: number;
      phong_ngu: number;
      giuong: number;
      phong_tam: number;
      mo_ta: string;
      gia_tien: number;
      may_giat: boolean;
      ban_la: boolean;
      tivi: boolean;
      dieu_hoa: boolean;
      wifi: boolean;
      do_xe: boolean;
      ho_boi: boolean;
      ban_ui: boolean;
      hinh_anh: string;
      vi_tri_id: number;
    },
  ): Promise<any> {
    const room = await this.prisma.phong.findFirst({
      where: { phong_id: +id },
    });

    if (room == null) {
      return {
        statusCode: 404,
        content: 'Room Not Found',
      };
    } else {
      const room = await this.prisma.phong.update({
        data,
        where: {
          phong_id: +id,
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
    const room = await this.prisma.phong.findFirst({
      where: { phong_id: +id },
    });

    if (room === null) {
      return {
        statusCode: 204,
        content: 'Room Not Found',
      };
    } else {
      const res = await this.prisma.phong.delete({
        where: { phong_id: +id },
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
    const room = await this.prisma.phong.findFirst({
      where: {
        phong_id: +id,
      },
    });

    if (room === null) {
      return {
        statusCode: 404,
        message: 'Phòng không tồn tại',
      };
    } else {
      const room = await this.prisma.phong.update({
        data: {
          hinh_anh: path,
        },
        where: {
          phong_id: +id,
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