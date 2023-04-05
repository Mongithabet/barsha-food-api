import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { OffersService } from '../../../offers/offers.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Resto-offers')
@Controller('resto-offers')
export class RestoOffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }
}
