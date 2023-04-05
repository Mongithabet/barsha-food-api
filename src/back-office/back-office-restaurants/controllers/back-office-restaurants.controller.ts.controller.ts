import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { FilterApproveRestaurantDto } from '../../../restaurants/dto/filter-approve-restaurant.dto';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-restaurants')
@Controller('bo-restaurants')
export class BackOfficeRestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }


  @Get()
  findAll( ) {
    return this.restaurantsService.findAllResto();
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
