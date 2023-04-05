import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateLocationDto {

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsNumber()
    readonly longitude: number;

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsNumber()
    readonly latitude: number;
}
