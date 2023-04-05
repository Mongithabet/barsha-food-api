import { Get, Injectable, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository){}


 
  create(createCategoryDto: CreateCategoryDto) {
      return this.categoryRepository.save(createCategoryDto);
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

