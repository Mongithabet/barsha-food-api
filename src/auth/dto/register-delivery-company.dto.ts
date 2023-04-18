import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString, IsEmail, MaxLength, IsOptional, IsUUID } from "class-validator";

export class RegisterDeliveryCompanyDto {

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    readonly company: string;



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

 
    
}
