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
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    commercialRegister: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    image: File | string;
  

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    logo: string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    aptNumber?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()   
    latitude: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional() 
    longitude: number;
 
    @ApiProperty({isArray: true, type: () => [String], required: true})
    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty()
    @IsUUID('all', { each: true })
    specialities: string[];
}


