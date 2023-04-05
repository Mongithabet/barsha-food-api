import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { MenusModule } from './menus/menus.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { UsersModule } from './users/users.module';
import { BackOfficeModule } from './back-office/back-office.module';
import { FilesModule } from './files/files.module';
import { RestoModule } from './resto/resto.module';
import { SubscriptionPlansModule } from './subscription-plans/subscription-plans.module';
import { OffersModule } from './offers/offers.module';





@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ ttl: null, isGlobal: true, }),
    SharedModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'barshafood',
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ["dist/migration/*{.ts,.js}"],
      synchronize: true,
      logging: true,
      // ssl: {
      //   rejectUnauthorized: false
      // },
                  
    }),


    
    TypeOrmExModule.forCustomRepository([]),
    UsersModule,
    RestaurantsModule,
    SpecialitiesModule,
    CategoriesModule,
    MenusModule,
    ItemsModule,
    CartsModule,
    FilesModule,
    BackOfficeModule,
    RestoModule,
    SubscriptionPlansModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
