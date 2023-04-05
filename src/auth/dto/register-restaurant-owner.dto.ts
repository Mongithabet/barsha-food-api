import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, MaxLength, ValidateNested } from "class-validator";
import { CreateRestaurantDto } from '../../restaurants/dto/create-restaurant.dto';

export class RegisterRestaurantOwnerDto {
    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;


    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    readonly phone: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    readonly password: string;

    @ApiProperty({ required: true })
    @Type(() => CreateRestaurantDto)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    readonly restaurant: CreateRestaurantDto;
}
