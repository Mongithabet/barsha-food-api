import { Module } from '@nestjs/common';
import { BackOfficeDeliveryCompaniesController } from './controllers/back-office-delivery-companies.controller';
import { UsersModule } from '../../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [BackOfficeDeliveryCompaniesController]
})
export class BackOfficeDeliveryCompaniesModule {}
