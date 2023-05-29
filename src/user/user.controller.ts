import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

class User {
  @ApiProperty({
    description: 'email',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'pass_word',
    type: String,
  })
  pass_word: string;
  @ApiProperty({
    description: 'name',
    type: String,
  })
  name: string;
  @ApiProperty({
    description: 'phone',
    type: Number,
  })
  phone: number;
  @ApiProperty({
    description: 'birth_day',
    type: String,
  })
  birth_day: string;
  @ApiProperty({
    description: 'gender',
    type: String,
  })
  gender: string;
  @ApiProperty({
    description: 'role',
    type: String,
  })
  role: string;
}
@ApiTags('User')
@Controller('user')
export class UserController {
  prisma = new PrismaClient();
  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) {}

  @ApiBody({
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createUser(
    @Body()
    body: {
      ten: string;
      email: string;
      mat_khau: string;
      dien_thoai: string;
      ngay_sinh: string;
      gioi_tinh: string;
      role: string;
    },
    @Headers('authorization') auth: string,
  ) {
    try {
      return await this.userService.createUser(body);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async users(@Headers('authorization') auth: string): Promise<any> {
    try {
      return await this.userService.users();
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/id/:id')
  async userByID(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ): Promise<any> {
    try {
      return await this.userService.userByID(id);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @Get('/name/:name')
  async userByName(
    @Param('name') name: string,
    @Headers('authorization') auth: string,
  ): Promise<any> {
    try {
      return await this.userService.userByName(name);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBody({
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async updateUser(
    @Param('id') id: number,
    @Headers('authorization')
    @Body()
    body: {
      ten: string;
      email: string;
      mat_khau: string;
      dien_thoai: string;
      ngay_sinh: string;
      gioi_tinh: string;
      role: string;
    },
  ): Promise<any> {
    try {
      return await this.userService.updateUser(body, id);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteUser(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ): Promise<any> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  @ApiConsumes('mutilpart/form-data')
  @ApiBody({
    description: 'fileUpload',
    // type: any
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
  @Post('/post-avatar/:id')
  async postAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // return file
    try {
      return this.userService.postAvatar(id, file.filename);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }
}

