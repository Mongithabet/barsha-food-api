import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from '../entities/user.entity';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { CustomersService } from '../services/customers.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Customer')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Patch('mine/location')
    update(@CurrentUser() user: User, @Body() updateLocationDto: UpdateLocationDto) {
        return this.customersService.updateLocation(user.id, updateLocationDto);
    }

}