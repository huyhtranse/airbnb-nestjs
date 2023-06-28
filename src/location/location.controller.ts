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
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLocation(
    @Body()
    createLocationDto: CreateLocationDto,
  ) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Get()
  async locations() {
    return await this.locationService.locations();
  }

  @Get('/:id')
  async getLocationwithId(@Param('id') id: string) {
    return await this.locationService.locationById(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body()
    updateLocationDto: UpdateLocationDto,
  ) {
    return await this.locationService.update(updateLocationDto, +id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteLocation(@Param('id') id: string) {
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
