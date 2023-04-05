import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { DeliveryCompaniesService } from '../services/delivery-companies.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('DeliveryCompanies')
@Controller('delivery-companies')
export class DeliveryCompaniesController {
  constructor(private readonly deliveryCompaniesService: DeliveryCompaniesService) {}

}