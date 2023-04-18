import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomersService } from '../../../users/services/customers.service';


import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateActiveDto } from 'src/users/dto/update-active.dto';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-customers')
@Controller('bo-customers')
export class BackOfficeCustomersController {

    constructor(private readonly customersService: CustomersService) { }


    @Get()
    findAll() {

      return this.customersService.findAll();

    }

    
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.customersService.findOne(id);
    }
 
    @Patch('mine/isactive')
    update(@CurrentUser() user: User, @Body() updateActiveDto: UpdateActiveDto) {
        return this.customersService.updateActive(user.id, updateActiveDto);
    }
}




