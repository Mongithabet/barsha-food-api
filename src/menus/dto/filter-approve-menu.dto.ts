import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { MenuVerificationStatusEnum } from "../enums/menu-verification-status.enum";

export class FilterApproveMenuDto {
    @ApiProperty({ enum: MenuVerificationStatusEnum, required: true })
    @IsEnum(MenuVerificationStatusEnum)
    @IsNotEmpty()
    verificationStatus: MenuVerificationStatusEnum;
}