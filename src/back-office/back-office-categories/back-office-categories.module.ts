import { Module } from '@nestjs/common';
import { BackOfficeCategoriesController } from './controllers/back-office-categories.controller';
import { CategoriesModule } from '../../categories/categories.module';

@Module({
    imports: [CategoriesModule],
    controllers: [BackOfficeCategoriesController]
})
export class BackOfficeCategoriesModule {}
