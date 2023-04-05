import { Controller, Get, Query } from '@nestjs/common';
import { MenusService } from './services/menus.service';
import { ApiTags } from '@nestjs/swagger';
import { FindMenusDto } from './dto/find-menus.dto';

@ApiTags('Menu')
@Controller('menus')
export class MenusController {
  constructor(
    private readonly menusService: MenusService) { }

  @Get()
  findAll(@Query() FindMenusDto: FindMenusDto) {
    return this.menusService.findAllByRestaurant(FindMenusDto.restaurant);
  }
}
