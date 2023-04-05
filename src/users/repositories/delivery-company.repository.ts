import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { DeliveryCompany } from '../entities/user.entity';

@CustomRepository(DeliveryCompany)
export class DeliveryCompanyRepository extends Repository<DeliveryCompany> {}
