import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ProductDiscount } from '../entities/offer.entity';

@CustomRepository(ProductDiscount)
export class ProductDiscountRepository extends Repository<ProductDiscount> {

}
