import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { RestaurantsService } from '../../../restaurants/restaurants.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Resto-restaurant')
@Controller('resto-restaurants')
export class RestoRestaurantsController {
  constructor(private restaurantsService: RestaurantsService) { }

  @Get('mine')
  findAll(@CurrentUser() user: User) {
    return this.restaurantsService.findAllByOwnerId(user.id);
  }
}
