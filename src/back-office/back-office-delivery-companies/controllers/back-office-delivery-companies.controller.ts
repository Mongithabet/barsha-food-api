import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeliveryCompaniesService } from '../../../users/services/delivery-companies.service';


import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-delivery-companies')
@Controller('bo-delivery-companies')
export class BackOfficeDeliveryCompaniesController {

    constructor(private readonly companiesService: DeliveryCompaniesService) { }



    @Get()
    findAll() {

      return this.companiesService.findAll();


    }

    
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.companiesService.findOne(id);
    }
 

}




