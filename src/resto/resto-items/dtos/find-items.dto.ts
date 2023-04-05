import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class FindItemsDto {
    @ApiProperty({ required: true, description: 'restaurant ID' })
    @IsNotEmpty()
    @IsUUID()
    restaurant: string;

    @ApiProperty({ required: true, description: 'menu ID' })
    @IsOptional()
    @IsUUID()
    menu: string;
}