import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ApiTags } from '@nestjs/swagger';
import { FindRestaurantsDto } from './dto/find-restaurants.dto';

@ApiTags('Restaurant')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(@Query() findRestaurantsDto: FindRestaurantsDto) {
    return this.restaurantsService.findFilteredRestaurants(findRestaurantsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }
  
}
