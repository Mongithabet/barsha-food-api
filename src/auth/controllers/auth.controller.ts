import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from '../dto/login-admin.dto';
import { LoginOtpDto } from '../dto/login-otp.dto';
import { OtpVerificationDto } from '../dto/otp-verification.dto';
import { RegisterRestaurantOwnerDto } from '../dto/register-restaurant-owner.dto';
import { AuthService } from '../services/auth.service';
import { LoginRstaurantOwnerDto } from '../dto/login-restaurant-owner.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('otp/customer')
    sendOtpCustomer(@Body() otpVerificationDto: OtpVerificationDto) {
        return this.authService.sendCustomerOtpCode(otpVerificationDto);
    }

    @Post('login/customer')
    customerLogin(@Body() loginOtpDto: LoginOtpDto) {
        return this.authService.loginCustomer(loginOtpDto);
    }
    
    @Post('login/delivery')
    deliveryLogin(@Body() loginOtpDto: LoginOtpDto) {
        return this.authService.loginDeliveryMan(loginOtpDto);
    }

    @Post('login/admin')
    adminLogin(@Body() loginAdminDto: LoginAdminDto) {
        return this.authService.loginAdmin(loginAdminDto);
    }

    @Post('register/restaurant-owner')
    registerRestaurantOwner(@Body() registerRestaurantOwnerDto: RegisterRestaurantOwnerDto) {
        return this.authService.registerRestaurantOwner(registerRestaurantOwnerDto);
    }

    @Post('login/restaurant-owner')
    loginRestaurantOwner(@Body() loginRstaurantOwnerDto: LoginRstaurantOwnerDto) {
        return this.authService.loginRestaurantOwner(loginRstaurantOwnerDto);
    }
}

