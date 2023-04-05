import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsUUID, IsNumber } from "class-validator";

export class CreateModifierItemDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    arName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({required: true})
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsUUID()
    item?: string;
}