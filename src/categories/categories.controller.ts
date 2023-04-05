import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }
  @Post()
  create(@Body()createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }  
@Patch(':id')
  update(@Param()id:string,@Body() updateCategoryDto:UpdateCategoryDto){
    return this.categoriesService.update(id,updateCategoryDto)
  }
}
