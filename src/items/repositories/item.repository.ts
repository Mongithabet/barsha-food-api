import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';

@CustomRepository(Item)
export class ItemRepository extends Repository<Item> {}
