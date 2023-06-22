import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  roomName: string;

  @ApiProperty()
  checkIn: string;

  @ApiProperty()
  checkOut: string;

  @ApiProperty()
  guest: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  roomId: number;
}
