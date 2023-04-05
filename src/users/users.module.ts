import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { DeliveryManRepository } from './repositories/delivery-man.repository';
import { AdminRepository } from './repositories/admin.repository';
import { CustomersService } from './services/customers.service';
import { DeliveryMansService } from './services/delivery-mans.service';
import { AdminsService } from './services/admins.service';
import { CartsModule } from '../carts/carts.module';
import { CustomersController } from './controllers/customers.controller';
import { RestaurantOwnerRepository } from './repositories/restaurant-owner.repository';
import { RestaurantOwnersService } from './services/restaurant-owners.service';
import { DeliveryCompanyRepository } from './repositories/delivery-company.repository';
import { DeliveryCompaniesService } from './services/delivery-companies.service';

@Module({
  controllers: [
    CustomersController],
  imports: [
    TypeOrmExModule.
      forCustomRepository([
        UserRepository,
        CustomerRepository,
        DeliveryManRepository,
        DeliveryCompanyRepository,
        AdminRepository,
        RestaurantOwnerRepository
      ]),
    forwardRef(() => CartsModule)
  ],
  exports: [
    TypeOrmExModule,
    CartsModule,
    UsersService,
    CustomersService,
    DeliveryMansService,
    DeliveryCompaniesService,

    AdminsService,
  RestaurantOwnersService],

  providers: [
    UsersService,
    CustomersService,
    DeliveryMansService,
    DeliveryCompaniesService,

    AdminsService,
    RestaurantOwnersService
  ]
})
export class UsersModule { }
