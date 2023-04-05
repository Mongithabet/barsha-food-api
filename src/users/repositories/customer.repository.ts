import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Customer } from '../entities/user.entity';

@CustomRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
