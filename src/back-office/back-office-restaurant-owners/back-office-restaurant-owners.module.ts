import { Module } from '@nestjs/common';
import { BackOfficeRestaurantOwnersController } from './controllers/back-office-restaurant-owners.controller';
import { UsersModule } from '../../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [BackOfficeRestaurantOwnersController]
})
export class BackOfficeRestaurantOwnersModule {}
