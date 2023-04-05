import { Module } from '@nestjs/common';
import { MenusModule } from '../../menus/menus.module';
import { BackOfficeMenusController } from './controllers/back-office-menus.controller.ts.controller';

@Module({
    imports: [MenusModule],
    controllers: [BackOfficeMenusController],
  })
export class BackOfficeMenusModule {}


