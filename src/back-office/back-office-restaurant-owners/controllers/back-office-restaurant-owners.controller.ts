import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RestaurantOwnersService } from '../../../users/services/restaurant-owners.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateLocationDto } from 'src/users/dto/update-location.dto';
import { UpdateActiveDto } from 'src/users/dto/update-active.dto';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-restaurant-owners')
@Controller('bo-restaurant-owners')
export class BackOfficeRestaurantOwnersController {

    constructor(private readonly restaurantOwnersService: RestaurantOwnersService) { }


    @Get()
    findAll() {

      return this.restaurantOwnersService.findAll();


    }

    
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.restaurantOwnersService.findOne(id);
    }
 
}




