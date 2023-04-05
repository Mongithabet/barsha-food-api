import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { ItemRepository } from './repositories/item.repository';
import { ModifierRepository } from './repositories/modifier.repository';
import { ModifierItemRepository } from './repositories/modifier-item.repository';
import { CustomItemRepository } from './repositories/custom-item.repository';

@Module({
  imports: [
    TypeOrmExModule.
      forCustomRepository([
        ItemRepository,
        ModifierRepository,
        ModifierItemRepository,
        CustomItemRepository
      ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
