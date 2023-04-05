import { Module } from '@nestjs/common';
import { RestoMenusController } from './resto-menus.controller';
import { MenusModule } from '../../menus/menus.module';

@Module({
  imports: [MenusModule],
  controllers: [RestoMenusController],
})
export class RestoMenusModule {}
