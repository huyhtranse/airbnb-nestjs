import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient} from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    prisma = new PrismaClient();

    
}
