import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeliveryMansService } from '../../../users/services/delivery-mans.service';


import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-delivery-mans')
@Controller('bo-delivery-mans')
export class BackOfficeDeliveryMansController {

    constructor(private readonly deliveryMansService: DeliveryMansService) { }


    @Get()
    findAll() {

      return this.deliveryMansService.findAll();


    }

    
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.deliveryMansService.findOne(id);
    }
 
 
}




