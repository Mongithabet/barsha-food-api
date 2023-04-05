import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, 
    IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateVariationDto } from "./create-variation.dto";
import { CreateModifierDto } from './create-modifier.dto';

export class CreateItemDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    arName: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    quantity?: number;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    variationTitle?: string;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    arVariationTitle?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsUUID()
    image: string;

    @ApiProperty({type: () => String, required: false})
    @IsUUID()
    @IsOptional()
    menu: string;

    @ApiProperty({isArray: true, type: () => [String], required: false})
    @IsArray()
    @ArrayMinSize(0)
    @IsOptional()
    @IsUUID('all', { each: true })
    categories?: string[];

    @ApiProperty({isArray: true, type: () => [CreateVariationDto], required: false})
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(0)
    @Type(() => CreateVariationDto)
    @IsOptional()
    variations?: CreateVariationDto[];

    @ApiProperty({isArray: true, type: () => [CreateModifierDto], required: false})
    @IsArray()
    @ValidateNested({ each: true, })
    @ArrayMinSize(0)
    @Type(() => CreateModifierDto)
    @IsOptional()
    modifiers?: CreateModifierDto[];
}
