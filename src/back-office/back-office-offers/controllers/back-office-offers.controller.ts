import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDiscountDto } from 'src/offers/dto/create-product-discount.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { OffersService } from '../../../offers/offers.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-offers')
@Controller('back-office-offers')
export class BackOfficeOffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createProductDiscountDto: CreateProductDiscountDto) {
    return this.offersService.create(createProductDiscountDto);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }
}
