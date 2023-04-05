import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateActiveDto {

    @ApiProperty({ required: true, })
    @IsNotEmpty()
    readonly isActive: boolean;

  
}
