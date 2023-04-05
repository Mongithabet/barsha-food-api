import { Module } from '@nestjs/common';
import { BackOfficeOffersController } from './controllers/back-office-offers.controller';
import { OffersModule } from '../../offers/offers.module';

@Module({
  imports: [OffersModule],
  controllers: [BackOfficeOffersController],
})
export class BackOfficeOffersModule {}
