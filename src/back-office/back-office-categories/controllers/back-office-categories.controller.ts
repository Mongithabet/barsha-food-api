import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-categories')
@Controller('bo-categories')
export class BackOfficeCategoriesController {

    constructor(private readonly categoriesService: CategoriesService) { }


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
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}




