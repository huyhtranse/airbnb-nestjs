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
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-location/')
  async createLocation(
    @Body()
    body: {
      ten_vi_tri: string;
      binh_luan: string;
      quoc_gia: string;
      hinh_anh: string;
    },
  ): Promise<any> {
    return this.locationService.createLocation(body);
  }

  @Get()
  async locations(): Promise<any> {
    return await this.locationService.locations();
  }

  @Get('/get-location/:id')
  async getLocationwithId(@Param('id') id: string): Promise<any> {
    return await this.locationService.getLocationById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-location/:id')
  async update(
    @Param('id') id: number,
    @Body()
    body: {
      ten_vi_tri: string;
      binh_luan: string;
      quoc_gia: string;
      hinh_anh: string;
    },
  ): Promise<any> {
    const { ten_vi_tri, binh_luan, quoc_gia, hinh_anh } = body;

    return await this.locationService.updateLocation(
      {
        ten_vi_tri,
        binh_luan,
        quoc_gia,
        hinh_anh,
      },
      id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-location/:id')
  async deleteLocation(@Param('id') id: string): Promise<any> {
    return await this.locationService.deleteLocation(id);
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
  @Post('/post-image/:id')
  postImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filename = file.filename;

    return this.locationService.postImage(id, filename);
  }
}
