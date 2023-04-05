import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from '../entities/user.entity';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { RestaurantOwnersService } from '../services/restaurant-owners.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { DeliveryMansService } from '../services/delivery-mans.service';
import { CreateDeliveryManDto } from '../dto/create-delivery-man.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('DeliveryMan')
@Controller('delivery-mans')
export class DeliveryMansController {
  constructor(private readonly deliveryMansService: DeliveryMansService) {}

  create(createdeliveryManDto: CreateDeliveryManDto) {
    return 'This action adds a new cart';
  }

}