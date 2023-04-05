import { Module } from '@nestjs/common';
import { RestaurantsModule } from '../../restaurants/restaurants.module';
import { BackOfficeRestaurantsController } from './controllers/back-office-restaurants.controller.ts.controller';

@Module({
    imports: [RestaurantsModule],
    controllers: [BackOfficeRestaurantsController],
  })
export class BackOfficeRestaurantsModule {}


