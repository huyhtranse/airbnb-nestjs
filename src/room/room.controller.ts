import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put, UseGuards, UseInterceptors, UploadedFile, Headers, HttpStatus } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { INTERNAL_SERVER_ERROR } from 'src/model/model';

class Room {

  @ApiProperty({
    description: "ten_phong", type: String
  })
  ten_phong: string;

  @ApiProperty({
    description: "khach", type: Number
  })
  khach: number;

  @ApiProperty({
    description: "phong_ngu", type: Number
  })
  phong_ngu: number;

  @ApiProperty({
    description: "giuong", type: Number
  })
  giuong: number;

  @ApiProperty({
    description: "phong_tam", type: Number
  })
  phong_tam: number;

  @ApiProperty({
    description: "mo_ta", type: String
  })
  mo_ta: string;

  @ApiProperty({
    description: "gia_tien", type: Number
  })
  gia_tien: number;

  @ApiProperty({
    description: "may_giat", type: Boolean
  })
  may_giat: boolean;

  @ApiProperty({
    description: "ban_la", type: Boolean
  })
  ban_la: boolean;

  @ApiProperty({
    description: "tivi", type: Boolean
  })
  tivi: boolean;

  @ApiProperty({
    description: "dieu_hoa", type: Boolean
  })
  dieu_hoa: boolean;

  @ApiProperty({
    description: "wifi", type: Boolean
  })
  wifi: boolean;

  @ApiProperty({
    description: "do_xe", type: Boolean
  })
  do_xe: boolean;

  @ApiProperty({
    description: "ho_boi", type: Boolean
  })
  ho_boi: boolean;
  @ApiProperty({
    description: "ban_ui", type: Boolean
  })
  ban_ui: boolean;
  @ApiProperty({
    description: "hinh_anh", type: String
  })
  hinh_anh: string;
  @ApiProperty({
    description: "id_vi_tri", type: Number
  })
  id_vi_tri: number;
}
@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBody({
    type: Room,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-room/')
  async createRoom(
    @Body()
    body: {
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
    @Headers('authorization') auth: string,
  ): Promise<any> {
    try {
      return this.roomService.createRoom(body);
    } catch (error) {
      throw new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }

  @Get()
  async rooms(@Headers('authorization') auth: string) {
    try {
      return await this.roomService.rooms();
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @Get('/:id')
  async roomById(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    try {
      return this.roomService.roomById(+id);
    } catch (error) {
      throw new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }

  @Get('/location/:locationId')
  async roomByLocation(
    @Param('locationId') id: string,
    @Headers('authorization') auth: string,
  ) {
    try {
      return this.roomService.roomByLocation(+id);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBody({
    type: Room,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-room/:id')
  async updateRoomInfo(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
    @Body()
    body: {
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
    try {
      return await this.roomService.updateRoomInfo(+id, body);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete('/delete/:id')
  async removeRoom(@Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    try {
      return await this.roomService.remove(+id);
    } catch (error) {
      throw new HttpException("Lỗi BE", 500)
    }
  }

  @ApiConsumes('mutilpart/form-data')
  @ApiBody({
    description: 'fileUpload',
  })
  @UseInterceptors(
    FileInterceptor('fileUpload', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  @Put('/post-image/:id')
  updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const filename = file.filename;

      return this.roomService.updateImage(id, filename);
    } catch (error) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}