import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { DaysEnum } from "src/shared/enums/days.enum";

export class CreateServingTimeDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    time: string;

    @ApiProperty({ required: true })
    @IsEnum(DaysEnum)
    @IsNotEmpty()
    day: DaysEnum;

    @ApiProperty({ required: true })
    @IsUUID()
    @IsNotEmpty()
    menu: string;
}