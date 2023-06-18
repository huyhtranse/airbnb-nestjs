import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../interfaces/user.interface';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  gender: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;
}
