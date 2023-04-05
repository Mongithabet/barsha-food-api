import { Module } from '@nestjs/common';
import { RestoOffersController } from './controllers/resto-offers.controller';
import { OffersModule } from '../../offers/offers.module';

@Module({
  controllers: [RestoOffersController],
  imports: [OffersModule]
})
export class RestoOffersModule {}
