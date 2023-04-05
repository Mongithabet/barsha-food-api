import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ItemsService } from '../../../items/items.service';
import { CreateItemDto } from '../../../items/dto/create-item.dto';
import { FindItemsDto } from '../dtos/find-items.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Resto-items')
@Controller('resto-items')
export class RestoItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  find(@Query() findItemsDto: FindItemsDto) { 
    return this.itemsService.findAll(findItemsDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) { 
    return this.itemsService.findCustomItem(id)
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) { 
    return this.itemsService.create(createItemDto)
  }
}
