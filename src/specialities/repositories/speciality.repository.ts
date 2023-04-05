import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Speciality } from '../entities/speciality.entity';

@CustomRepository(Speciality)
export class SpecialityRepository extends Repository<Speciality> {}
