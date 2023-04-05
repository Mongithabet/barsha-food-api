import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ServingTime } from '../entities/serving-time.entity';

@CustomRepository(ServingTime)
export class ServingTimeRepository extends Repository<ServingTime> {}
