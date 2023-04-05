import { Module } from '@nestjs/common';
import { RestoMenusModule } from './resto-menus/resto-menus.module';
import { RestoItemsModule } from './resto-items/resto-items.module';
import { RestoSpecialitiesModule } from './resto-specialities/resto-specialities.module';
import { RestoRestaurantsModule } from './resto-restaurants/resto-restaurants.module';
import { RestoOffersModule } from './resto-offers/resto-offers.module';

@Module({
  imports: [RestoMenusModule, RestoItemsModule, RestoSpecialitiesModule, RestoRestaurantsModule, RestoOffersModule]
})
export class RestoModule {}
