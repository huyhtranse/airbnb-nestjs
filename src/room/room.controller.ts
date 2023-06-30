import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createRoom(
    @Body()
    createRoomDto: CreateRoomDto,
  ) {
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

  @Get('/:locationId/location')
  async roomByLocation(@Param('locationId') id: string) {
    return this.roomService.roomByLocation(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body()
    updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomService.update(+id, updateRoomDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.roomService.delete(+id);
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
