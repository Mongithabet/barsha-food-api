import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString, IsEmail, MaxLength, IsOptional, IsUUID } from "class-validator";

export class RegisterDeliveryManDto {

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
    //@IsPhoneNumber()
    readonly phone: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    readonly password: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsUUID()
    readonly company: string;  
    
}
