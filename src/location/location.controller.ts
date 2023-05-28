import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put, UseGuards, Headers, UseInterceptors, UploadedFile, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { INTERNAL_SERVER_ERROR } from 'src/model/model';
import { Express } from 'express';
class Location {
  @ApiProperty({
    description: "ten_vi_tri", type: String
  })
  ten_vi_tri: string;

  @ApiProperty({
    description: "tinh_thanh", type: String
  })
  tinh_thanh: string;

  @ApiProperty({
    description: "quoc_gia", type: String
  })
  quoc_gia: string;

  @ApiProperty({
    description: "hinh_anh", type: String
  })
  hinh_anh: string;


  id_vi_tri: number;
}

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @ApiBody({
    type: Location,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-location/')
  async createLocation(
    @Headers('authorization') auth: string,
    @Body()
    body: {
      ten_vi_tri: string;
      binh_luan: string;
      quoc_gia: string;
      hinh_anh: string;
    },
  ): Promise<any> {
    try {
      return this.locationService.createLocation(body);
    } catch (error) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllLocation(@Headers('authorization') auth: string): Promise<any> {
    try {
      return await this.locationService.getAllLocation();
    } catch (error) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/get-location/:id')
  async getLocationwithId(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.locationService.getLocationById(id);
    } catch (error) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBody({
    type: Location,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-location/:id')
  async updateLocation(
    @Headers('authorization') auth: string,
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
    try {
      return await this.locationService.updateLocation(
        {
          ten_vi_tri,
          binh_luan,
          quoc_gia,
          hinh_anh,
        },
        id,
      );
    } catch (error) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-location/:id')
  async deleteLocation(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.locationService.deleteLocation(id);
    } catch (error) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
  @Post('/post-image/:id')
  postImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const filename = file.filename;

      return this.locationService.postImage(id, filename);
    } catch (error) {
      throw new HttpException(
        InternalServerErrorException,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}