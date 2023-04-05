import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [
    TypeOrmExModule.
      forCustomRepository([
        CategoryRepository,
        ]),
  ], 
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]

})
export class CategoriesModule {}
