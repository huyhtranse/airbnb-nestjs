import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';

// Dto : Data transfer object
// localhost:8080/user
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private config: ConfigService
    ) { }

    @Get(":id")
    getUserbyId() {
        return "get user by id"
    }

    @Post()
    createUser() {
        return "create user"
    }
    @Put()
    updateUser() {
        return "update user"
    }
    @Delete()
    removeUser() {
        return "remove user"
    }
}


// yarn add prisma @prisma/client
// yarn prisma init
// thay đổi thông tin kết nối CSDL
// yarn prisma db pull 
// yarn prisma generate