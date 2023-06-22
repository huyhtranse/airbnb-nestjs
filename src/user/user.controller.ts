import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async users(): Promise<any> {
    try {
      return await this.userService.users();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async userByID(@Param('id') id: string): Promise<any> {
    try {
      return await this.userService.userByID(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/name/:name')
  async userByName(@Param('name') name: string): Promise<any> {
    try {
      return await this.userService.userByName(name);
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

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
  ) {
      return await this.userService.updateUser(body, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string) {
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
