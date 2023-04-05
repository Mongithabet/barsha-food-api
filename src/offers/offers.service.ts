import { Injectable } from '@nestjs/common';
import { CreateProductDiscountDto } from './dto/create-product-discount.dto';
import { OfferRepository } from './repositories/offer.repository';
import { ProductDiscountRepository } from './repositories/product-discount.repository';

@Injectable()
export class OffersService {
  constructor(private offerRepository: OfferRepository, private productDiscountRepository: ProductDiscountRepository) { }

  create(createProductDiscountDto: CreateProductDiscountDto) {
    return this.productDiscountRepository.save(createProductDiscountDto);
  }

  findAll() {
    return this.offerRepository.find({
      relations: ['image']
    })
  }

  findOne(id: string) {
    return this.offerRepository.findOne({
      where: { id },
      relations: ['image', 'restaurants', 'restaurants.restaurant']
    })
  }

}
