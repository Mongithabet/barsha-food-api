import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class FindMenusDto {
    @ApiProperty({ description: 'restaurant ID' })
    @IsUUID()
    @IsNotEmpty()
    restaurant: string;
}