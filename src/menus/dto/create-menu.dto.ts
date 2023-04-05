import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMenuDto {
    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    arName: string;

    @ApiProperty({
        required: true,
        description: 'Restaurant ID'
    })
    @IsNotEmpty()
    @IsUUID()
    restaurant: string;
}