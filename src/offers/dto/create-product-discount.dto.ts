import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProductDiscountDto {

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ required: true })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ required: true })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ required: true })
    @IsUUID()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    offerStartTime: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    offerEndTime: string;
}
