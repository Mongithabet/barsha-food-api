import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateModifierDto } from "./create-modifier.dto";

export class CreateVariationDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    arName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ isArray: true, type: () => [CreateModifierDto], required: false })
    @IsArray()
    @ValidateNested({ each: true, })
    @ArrayMinSize(0)
    @Type(() => CreateModifierDto)
    @IsOptional()
    modifiers?: CreateModifierDto[];
}