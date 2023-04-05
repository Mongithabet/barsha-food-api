import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { RestaurantVerificationStatusEnum } from "../enums/restaurant-verification-status.enum";

export class FilterApproveRestaurantDto {
    @ApiProperty({ enum: RestaurantVerificationStatusEnum, required: true })
    @IsEnum(RestaurantVerificationStatusEnum)
    @IsNotEmpty()
    verificationStatus: RestaurantVerificationStatusEnum;
}