import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { DeliveryMan } from '../entities/user.entity';

@CustomRepository(DeliveryMan)
export class DeliveryManRepository extends Repository<DeliveryMan> {}
