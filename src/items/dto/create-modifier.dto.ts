import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { ModifierTypeEnum } from '../enums/modifier-type.enum';
import { CreateModifierItemDto } from './create-modifier-item.dto';

export class CreateModifierDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    arName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ enum: ModifierTypeEnum, required: true })
    @IsEnum(ModifierTypeEnum)
    @IsNotEmpty()
    type: ModifierTypeEnum;

    @ApiProperty({ required: true })
    @IsBoolean()
    @IsNotEmpty()
    isMandatory: boolean;

    @ApiProperty({ required: true })
    @IsBoolean()
    @IsNotEmpty()
    isMultipleChoice: boolean;

    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    maxSelectionCount: number;

    @ApiProperty({ isArray: true, type: () => [CreateModifierItemDto], required: true })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CreateModifierItemDto)
    @IsNotEmpty()
    modifierItems: CreateModifierItemDto[];
}