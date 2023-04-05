import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { RestaurantOwner } from '../entities/user.entity';

@CustomRepository(RestaurantOwner)
export class RestaurantOwnerRepository extends Repository<RestaurantOwner> { }
