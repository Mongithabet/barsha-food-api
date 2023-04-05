import { Injectable, NotAcceptableException, NotFoundException, HttpException, ConflictException } from '@nestjs/common';
import { CustomersService } from 'src/users/services/customers.service';
import { LoginAdminDto } from '../dto/login-admin.dto';
import { LoginOtpDto } from '../dto/login-otp.dto';
import { RegisterCustomerDto } from '../dto/register-customer.dto';
import * as bcrypt from 'bcrypt';
import { DeliveryMansService } from 'src/users/services/delivery-mans.service';
import { AdminsService } from 'src/users/services/admins.service';
import { JwtService } from '@nestjs/jwt';
import { MemoryStoreService } from 'src/shared/services/memory-store.service';
import * as crypto from 'crypto';
import { OtpVerificationDto } from '../dto/otp-verification.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RestaurantOwner } from '../../users/entities/user.entity';
import { RegisterRestaurantOwnerDto } from '../dto/register-restaurant-owner.dto';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { RestaurantOwnersService } from '../../users/services/restaurant-owners.service';
import { UsersService } from '../../users/services/users.service';
import { Speciality } from '../../specialities/entities/speciality.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly customersService: CustomersService,
        private readonly restaurantOwnersService: RestaurantOwnersService,
        private readonly usersService: UsersService,
        private readonly deliveryMansService: DeliveryMansService,
        private readonly adminsService: AdminsService,
        private memoryStoreService: MemoryStoreService,
        @InjectDataSource() private dataSource: DataSource
    ) { }

    registerRestaurantOwner = async (registerRestaurantOwnerDto: RegisterRestaurantOwnerDto) => {
        // create a new query runner
        const queryRunner = this.dataSource.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()

        // lets now open a new transaction:
        await queryRunner.startTransaction()
        try {
            
            const fetchedUser =
                await this.usersService.findOneByEmailOrPhone(registerRestaurantOwnerDto.email, registerRestaurantOwnerDto.phone)
            if (fetchedUser) throw new ConflictException('USER WITH EMAIL OR PHONE ALREADY EXISTS');
            const resturantOwner = new RestaurantOwner;
            resturantOwner.email = registerRestaurantOwnerDto.email;
            resturantOwner.phone = registerRestaurantOwnerDto.phone;
            resturantOwner.password = bcrypt.hashSync(registerRestaurantOwnerDto.password, 8);
            resturantOwner.firstName = registerRestaurantOwnerDto.firstName;
            resturantOwner.lastName = registerRestaurantOwnerDto.lastName;

            const createdRestaurantOwner = await queryRunner.manager.save(RestaurantOwner, resturantOwner);

            const createdRestaurant = await queryRunner.manager.save(Restaurant, {
                ...registerRestaurantOwnerDto.restaurant,
                owner: createdRestaurantOwner
            });

            for (const speciality of registerRestaurantOwnerDto.restaurant.specialities) {
                const fetchedSepciality = await queryRunner.manager.findOne(Speciality,
                    {
                        where: { id: speciality },
                        relations: ['restaurants']
                    });
                fetchedSepciality.restaurants.push(createdRestaurant);
                await queryRunner.manager.save(Speciality, fetchedSepciality)
            }

            const menu = new Menu();
            menu.isDefault = true;
            menu.name = 'Main menu';
            menu.arName = 'قائمة الطعام الرئيسية';
            menu.restaurant = createdRestaurant;
            await queryRunner.manager.save(Menu, menu);

            // commit transaction
            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction()
            throw new HttpException(err, err.status)
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release()
        }
    }

    registerCustomer = async (registerCustomerDto: RegisterCustomerDto) => {
        const generatedOTP = crypto
            .randomInt(100000, 1000000)
            .toString()
            .padStart(6, '0');
        console.log(generatedOTP);
        const fetchedCustomer = await this.customersService.findOneByPhone(registerCustomerDto.phone);
        if (fetchedCustomer) throw new NotAcceptableException('USER ALREADY REGISTERED');
        await this.memoryStoreService.set(registerCustomerDto.phone, { ...registerCustomerDto, otp: '123456' });
    }

    loginCustomer = async (loginOtpDto: LoginOtpDto) => {
        const customer = await this.validateCustomer(loginOtpDto.phone, loginOtpDto.otp);
        if (!customer) throw new NotAcceptableException('فشل عملية الدخول');
        customer.otp = null;
        await this.customersService.update(customer);

        const payload = {
            id: customer.id,
            phone: customer.phone,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            expiresIn: 3600,
            accessToken: accessToken,
            user: payload,
        };
    }

    loginDeliveryMan = async (loginOtpDto: LoginOtpDto) => {
        const fetchedDeliveryMan = await this.validateDeliveryMan(loginOtpDto.phone, loginOtpDto.otp);
        if (fetchedDeliveryMan) {
            fetchedDeliveryMan.otp = null;
            await this.deliveryMansService.update(fetchedDeliveryMan);
            const payload = {
                email: fetchedDeliveryMan.email,
                id: fetchedDeliveryMan.id,
                phone: fetchedDeliveryMan.phone,
            };

            const accessToken = this.jwtService.sign(payload);

            return {
                expiresIn: 3600,
                accessToken: accessToken,
                user: payload,
            };
        }
        else throw new NotAcceptableException('رمز OTP غير صالح');
    }

    loginAdmin = async (loginAdmin: LoginAdminDto) => {
        const admin = await this.validateAdmin(loginAdmin.email, loginAdmin.password);
        if (!admin) throw new NotAcceptableException('فشل عملية الدخول');

        const payload = {
            email: admin.email,
            id: admin.id,
            phone: admin.phone,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            expiresIn: 3600,
            accessToken: accessToken,
            user: payload,
        };
    }

    loginRestaurantOwner = async (loginAdmin: LoginAdminDto) => {
        const restaurantOwner = await this.validateRestaurantOwner(loginAdmin.email, loginAdmin.password);
        if (!restaurantOwner) throw new NotAcceptableException('فشل عملية الدخول');

        const payload = {
            email: restaurantOwner.email,
            id: restaurantOwner.id,
            phone: restaurantOwner.phone,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            expiresIn: 3600,
            accessToken: accessToken,
            user: payload,
        };
    }

    validateAdmin = async (email: string, password: string) => {
        const fetchedAdmin = await this.adminsService.findOneByEmail(email);
        if (!fetchedAdmin) throw new NotFoundException('ADMIN NOT FOUND');
        const passwordIsValid = bcrypt.compareSync(
            password,
            fetchedAdmin.password,
        );

        if (!passwordIsValid == true) {
            throw new NotAcceptableException('فشل عملية الدخول. كلمة مرور خاطئة');
        }
        return fetchedAdmin;
    }

    validateRestaurantOwner = async (email: string, password: string) => {
        const fetchedRstaurantOwner = await this.restaurantOwnersService.findOneByEmail(email);
        if (!fetchedRstaurantOwner) throw new NotFoundException('لم يتم العثور على مالك المطعم');
        const passwordIsValid = bcrypt.compareSync(
            password,
            fetchedRstaurantOwner.password,
        );

        if (!passwordIsValid == true) {
            throw new NotAcceptableException('فشل عملية الدخول. كلمة مرور خاطئة');
        }
        return fetchedRstaurantOwner;
    }

    validateCustomer = async (phone: string, otp: string) => {
        const fetchedCustomer = await this.customersService.findOneByPhone(phone);
        if (fetchedCustomer) {
            const otpIsValid = otp === fetchedCustomer.otp;
            if (otpIsValid == false) throw new NotAcceptableException('رمز OTP غير صالح');
            return fetchedCustomer;
        } else {
            return this.memoryStoreService.get(phone).then(
                res => {
                    console.log(res, 'ddzz')
                    if (res.otp == otp) {
                        return this.customersService.create({ phone })
                    }
                },
                err => { throw new NotFoundException('USER NOT FOUND'); }
            )
        }
    }

    validateDeliveryMan = async (phone: string, otp: string) => {
        const fetchedDeliveryMan = await this.deliveryMansService.findOneByPhone(phone);
        if (!fetchedDeliveryMan) throw new NotFoundException('USER NOT FOUND');

        const otpIsValid = otp === fetchedDeliveryMan.otp;
        if (otpIsValid == false) throw new NotAcceptableException('رمز OTP غير صالح');

        return fetchedDeliveryMan;
    }

    validateCustomerAccount = async (loginOtpDto: LoginOtpDto) => {
        const fetchedCustomer = await this.memoryStoreService.get(loginOtpDto.phone);
        if (fetchedCustomer && fetchedCustomer.otp == loginOtpDto.otp) {
            await this.memoryStoreService.del(loginOtpDto.phone);
            fetchedCustomer.otp = null;
            return this.customersService.create(fetchedCustomer);
        }
        else throw new NotAcceptableException('رمز OTP غير صالح');
    }

    sendCustomerOtpCode = async (otpVerificationDto: OtpVerificationDto) => {
        const fetchedCustomer = await this.customersService.findOneByPhone(otpVerificationDto.phone);

        const generatedOTP = crypto
            .randomInt(100000, 1000000)
            .toString()
            .padStart(6, '0');

        /*
        *   @TODO add twilio service
        */
        if (fetchedCustomer) {
            fetchedCustomer.otp = '123456';
            await this.customersService.update(fetchedCustomer);
        } else {

            await this.memoryStoreService.set(otpVerificationDto.phone, {
                phone: otpVerificationDto.phone,
                otp: '123456'
            });
        }

    }
}
