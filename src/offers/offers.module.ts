import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { OfferRepository } from './repositories/offer.repository';
import { ProductDiscountRepository } from './repositories/product-discount.repository';

@Module({
  imports: [
    TypeOrmExModule.
      forCustomRepository([
        OfferRepository,
        ProductDiscountRepository
      ]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService]
})
export class OffersModule {}
