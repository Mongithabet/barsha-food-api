import { Module } from '@nestjs/common';
import { BackOfficeSpecialitiesController } from './controllers/back-office-specialities.controller';
import { SpecialitiesModule } from '../../specialities/specialities.module';

@Module({
    imports: [SpecialitiesModule],
    controllers: [BackOfficeSpecialitiesController],
})
export class BackOfficeSpecialitiesModule {}
