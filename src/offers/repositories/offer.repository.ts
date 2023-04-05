import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@CustomRepository(Offer)
export class OfferRepository extends Repository<Offer> {

}
