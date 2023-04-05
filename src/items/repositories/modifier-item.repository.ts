import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ModifierItem } from '../entities/modifier-item.entity';

@CustomRepository(ModifierItem)
export class ModifierItemRepository extends Repository<ModifierItem> {}
