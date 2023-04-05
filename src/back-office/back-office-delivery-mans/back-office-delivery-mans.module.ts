import { Module } from '@nestjs/common';
import { BackOfficeDeliveryMansController } from './controllers/back-office-delivery-mans.controller';
import { UsersModule } from '../../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [BackOfficeDeliveryMansController]
})
export class BackOfficeDeliveryMansModule {}
