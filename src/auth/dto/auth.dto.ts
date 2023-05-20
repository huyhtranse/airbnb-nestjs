import { ApiProperty } from '@nestjs/swagger';

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
}

export interface LogInDto {
  email: string;
  password: string;
}

export class LogInUserDto {
  @ApiProperty({
    description: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'mat_khau',
    type: String,
  })
  mat_khau: string;
}

export class SignUpUserDto {
  @ApiProperty({
    description: 'name',
    type: String,
  })
  name: string;
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
    description: 'phone',
    type: Number,
  })
  phone: number;
  @ApiProperty({
    description: 'birthday',
    type: String,
  })
  birthday: string;
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
