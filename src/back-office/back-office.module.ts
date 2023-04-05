import { Module } from '@nestjs/common';
import { BackOfficeSpecialitiesModule } from './back-office-specialities/back-office-specialities.module';
import { BackOfficeOffersModule } from './back-office-offers/back-office-offers.module';
import { BackOfficeMenusModule } from './back-office-menus/back-office-menus.module';
import { BackOfficeItemsModule } from './back-office-items/back-office-items.module';
import { BackOfficeCategoriesModule } from './back-office-categories/back-office-categories.module';
import { BackOfficeCustomersModule } from './back-office-customers/back-office-customers.module';
import { BackOfficeRestaurantOwnersModule } from './back-office-restaurant-owners/back-office-restaurant-owners.module';
import { BackOfficeDeliveryMansModule } from './back-office-delivery-mans/back-office-delivery-mans.module';
import { BackOfficeDeliveryCompaniesModule } from './back-office-delivery-companies/back-office-delivery-companies.module';
import { BackOfficeRestaurantsModule } from './back-office-restaurants/back-office-restaurants.module';

@Module({
  imports: [BackOfficeSpecialitiesModule, BackOfficeOffersModule, BackOfficeMenusModule, BackOfficeItemsModule, BackOfficeCategoriesModule,BackOfficeCustomersModule,BackOfficeRestaurantOwnersModule,BackOfficeDeliveryMansModule,BackOfficeDeliveryCompaniesModule,BackOfficeRestaurantsModule]
})
export class BackOfficeModule {}
