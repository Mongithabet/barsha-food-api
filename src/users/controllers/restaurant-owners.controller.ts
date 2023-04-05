import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from '../entities/user.entity';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { RestaurantOwnersService } from '../services/restaurant-owners.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('RestaurantOwner')
@Controller('restaurant-owners')
export class RestaurantOwnersController {
  constructor(private readonly restaurantOwnersService: RestaurantOwnersService) {}



}