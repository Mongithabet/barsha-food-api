import { Module } from '@nestjs/common';
import { MenusService } from './services/menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { MenuRepository } from './repositories/menu.repository';
import { ServingTimeRepository } from './repositories/serving-time.repository';
import { ServingTimesService } from './services/serving-times.service';

@Module({
  imports: [
    TypeOrmExModule.
      forCustomRepository([
        MenuRepository,
        ServingTimeRepository
      ]),
  ],
  controllers: [MenusController],
  exports: [MenusService, ServingTimesService],
  providers: [MenusService, ServingTimesService]
})
export class MenusModule {}