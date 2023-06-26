import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
    @ApiProperty()
    guest: number;

    @ApiProperty()
    name: string;
     
    @ApiProperty()
    bedRoom: number;

    @ApiProperty()
    bed: number;

    @ApiProperty()
    bathRoom: number;

    @ApiProperty()
    describe: string;
     
    @ApiProperty()
    price: number;

    @ApiProperty()
    washer: boolean;

    @ApiProperty()
    iron: boolean;

    @ApiProperty()
    tv: boolean;

    @ApiProperty()
    airCon: boolean;

    @ApiProperty()
    wifi: boolean;

    @ApiProperty()
    kitchen: boolean;

    @ApiProperty()
    parking: boolean;

    @ApiProperty()
    pool: boolean;

    @ApiProperty()
    image: string;

    @ApiProperty()
    locationId: number;
}
