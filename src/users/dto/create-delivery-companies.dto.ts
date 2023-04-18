import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDeliveryCompaniesDto{
 
   
     
    
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    commercialRegister: string;
      
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    expirationDate: Date;
    
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsUUID()
    image: string;



}