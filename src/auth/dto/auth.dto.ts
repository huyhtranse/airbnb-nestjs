import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/user/interfaces/user.interface';


export class LogInDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class SignUpDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
  
  @ApiProperty({ enum: UserRole })
  role: UserRole;
}
