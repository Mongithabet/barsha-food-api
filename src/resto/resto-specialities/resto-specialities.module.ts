import { Module } from '@nestjs/common';
import { RestoSpecialitiesController } from './controllers/resto-specialities.controller';
import { SpecialitiesModule } from '../../specialities/specialities.module';

@Module({
  imports: [SpecialitiesModule],
  controllers: [RestoSpecialitiesController],
})
export class RestoSpecialitiesModule {}
