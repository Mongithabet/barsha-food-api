import { Module } from '@nestjs/common';
import { BackOfficeCustomersController } from './controllers/back-office-customers.controller';
import { UsersModule } from '../../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [BackOfficeCustomersController]
})
export class BackOfficeCustomersModule {}
