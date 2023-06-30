import {
  Body,
  Controller,
  Delete,
  Get,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async users() {
    return await this.userService.users();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Get success' })
  async userByID(@Param('id') userId: string) {
    return await this.userService.userByID(+userId);
  }

  @Get('/:name/name')
  async userByName(@Param('name') name: string) {
    return await this.userService.userByName(name);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(+id);
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
    return this.userService.postAvatar(id, file.filename);
  }
}
