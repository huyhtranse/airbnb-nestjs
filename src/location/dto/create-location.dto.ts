import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
  @ApiProperty()
  
  name: string;
  @ApiProperty()
  
  describe: string;
  @ApiProperty()
  
  country: string;
  @ApiProperty()
  
  image: string;
}
