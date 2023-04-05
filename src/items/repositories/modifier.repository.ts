import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Modifier } from '../entities/modifier.entity';

@CustomRepository(Modifier)
export class ModifierRepository extends Repository<Modifier> {}
