import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSpecialityDto } from './dto/create-speciality.dto';

@ApiTags('Speciality')
@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) { }

  @Get()
  findAll() {
    return this.specialitiesService.findAll();
  }

  @Post()
  create(@Body() createSpecialityDto:CreateSpecialityDto){
    return this.specialitiesService.create(createSpecialityDto)
  }
}

