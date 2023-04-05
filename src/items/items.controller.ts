import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiTags } from '@nestjs/swagger';
import { FindItemsDto } from 'src/resto/resto-items/dtos/find-items.dto';

@ApiTags('Item')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findCustomItem(id);
  }

  @Get()
  findAll(@Query() findItemsDto: FindItemsDto) {
    return this.itemsService.findAll(findItemsDto);
  }
}