import { Controller, Get } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Speciality')
@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) { }

  @Get()
  findAll() {
    return this.specialitiesService.findAll();
  }
}
