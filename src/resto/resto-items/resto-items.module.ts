import { Module } from '@nestjs/common';
import { RestoItemsController } from './controllers/resto-items.controller';
import { ItemsModule } from '../../items/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [RestoItemsController],
})
export class RestoItemsModule {}
