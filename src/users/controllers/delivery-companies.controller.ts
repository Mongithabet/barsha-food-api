import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { DeliveryCompaniesService } from '../services/delivery-companies.service';
import { CreateDeliveryCompaniesDto } from '../dto/create-delivery-companies.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('DeliveryCompanies')
@Controller('delivery-companies')
export class DeliveryCompaniesController {
  constructor(private readonly deliveryCompaniesService: DeliveryCompaniesService) {}


}