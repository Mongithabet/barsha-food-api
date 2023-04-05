import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class FindRestaurantsDto {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUUID()
    speciality?: string;

}