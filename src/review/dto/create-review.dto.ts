import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  star: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  roomId: number;
}
