import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MaxLength } from "class-validator";

export class LoginAdminDto {
    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    readonly password: string;
}
