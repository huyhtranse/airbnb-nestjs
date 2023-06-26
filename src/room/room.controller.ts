import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Headers,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateRoomDto } from './dto/create-room.dto';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-room/')
  async createRoom(
    @Body()
    createRoomDto: CreateRoomDto
  ): Promise<any> {
    return this.roomService.createRoom(createRoomDto);
  }

  @Get()
  async rooms() {
    return await this.roomService.rooms();
  }

  @Get('/:id')
  async roomById(@Param('id') id: string) {
    return this.roomService.roomById(+id);
  }

  @Get('/location/:locationId')
  async roomByLocation(@Param('locationId') id: string) {
    return this.roomService.roomByLocation(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-room/:id')
  async updateRoomInfo(
    @Param('id') id: string,

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
    return await this.roomService.updateRoomInfo(+id, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async removeRoom(@Param('id') id: string) {
    return await this.roomService.remove(+id);
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
    const filename = file.filename;

    return this.roomService.updateImage(id, filename);
  }
}
