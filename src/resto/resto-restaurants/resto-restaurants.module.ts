import { Module } from '@nestjs/common';
import { RestoRestaurantsController } from './controllers/resto-restaurants.controller';
import { RestaurantsModule } from '../../restaurants/restaurants.module';

@Module({
  imports: [RestaurantsModule],
  controllers: [RestoRestaurantsController],
})
export class RestoRestaurantsModule {}
