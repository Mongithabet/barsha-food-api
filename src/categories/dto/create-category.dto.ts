import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateSpecialityDto } from "src/specialities/dto/create-speciality.dto";

export class CreateCategoryDto {


    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    arName: string;


    
    @ApiProperty({isArray: true, type: () => [String], required: true})
    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty()
    @IsUUID('all', { each: true })
    specialities: string[];

    

}
