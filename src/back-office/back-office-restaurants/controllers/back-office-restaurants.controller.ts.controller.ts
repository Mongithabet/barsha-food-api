import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { FilterApproveRestaurantDto } from '../../../restaurants/dto/filter-approve-restaurant.dto';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CreateRestaurantDto } from 'src/restaurants/dto/create-restaurant.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-restaurants')
@Controller('bo-restaurants')
export class BackOfficeRestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }


  @Get()
  findAll( ) {
    return this.restaurantsService.findAllResto();
  } 

  @Get(':id')
  findById(@Param('id') id:string ) {
    return this.restaurantsService.findOne(id);
  } 


  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.restaurantsService.approve(id);
  }


  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.restaurantsService.reject(id);
  }
}
