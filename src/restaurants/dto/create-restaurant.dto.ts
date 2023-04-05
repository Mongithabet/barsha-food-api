import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateRestaurantDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    logo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    aptNumber?: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @ApiProperty({isArray: true, type: () => [String], required: true})
    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty()
    @IsUUID('all', { each: true })
    specialities: string[];
}
