import { Get, HttpException, Injectable, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import { Speciality } from 'src/specialities/entities/speciality.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository,
    @InjectDataSource() private dataSource: DataSource
    ){}


 
  /* create(createCategoryDto: CreateCategoryDto) {
      return this.categoryRepository.save(createCategoryDto);
    }  
 */
    create = async (createCategoryDto: CreateCategoryDto) => {
      // create a new query runner
      const queryRunner = this.dataSource.createQueryRunner()

      // establish real database connection using our new query runner
      await queryRunner.connect()

      // lets now open a new transaction:
      await queryRunner.startTransaction()
      try {
          
        const category = new Category;
        category.arName=createCategoryDto.arName
        category.name=createCategoryDto.name
    
        const createdCategory = await queryRunner.manager.save(Category, category);


        for (const speciality of createCategoryDto.specialities) {
            const fetchedSepciality = await queryRunner.manager.findOne(Speciality,
                {
                    where: { id: speciality },
                    relations: ['categories']
                });
            fetchedSepciality.categories.push(createdCategory);
            await queryRunner.manager.save(Speciality, fetchedSepciality)
        }


          // commit transaction
          await queryRunner.commitTransaction();
      } catch (err) {
          // since we have errors let's rollback changes we made
          await queryRunner.rollbackTransaction()
          throw new HttpException(err, err.status)
      } finally {
          // you need to release query runner which is manually created:
          await queryRunner.release()
      }
  }





  findAll() {
    return this.categoryRepository.find();
  }
 
  findOne(id: string) {
    return this.categoryRepository.findOne({ where: { id }});
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id,updateCategoryDto);
  }
 



  remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}

