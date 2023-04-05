import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecialitiesService } from 'src/specialities/specialities.service';

@ApiTags('Resto-speciality')
@Controller('resto-specialities')
export class RestoSpecialitiesController {
  constructor(private specialitiesService: SpecialitiesService) {}

  @Get()
  findAll() {
    return this.specialitiesService.findAll();
  }
}
