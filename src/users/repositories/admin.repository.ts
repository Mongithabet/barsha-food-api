import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Admin } from '../entities/user.entity';

@CustomRepository(Admin)
export class AdminRepository extends Repository<Admin> {}
