import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MenusService } from '../../menus/services/menus.service';
import { CreateMenuDto } from '../../menus/dto/create-menu.dto';
import { FindMenusDto } from '../../menus/dto/find-menus.dto';
import { ServingTimesService } from '../../menus/services/serving-times.service';
import { CreateServingTimeDto } from 'src/menus/dto/create-serving-time.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UpdateMenuDto } from 'src/menus/dto/update-menu.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Resto-menus')
@Controller('resto-menus')
export class RestoMenusController {
  constructor(private readonly menusService: MenusService,
    private readonly servingTimesService: ServingTimesService) { }

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Post('serving-times')
  createServingTime(@Body() createServingTimeDto: CreateServingTimeDto) {
    return this.servingTimesService.create(createServingTimeDto);
  }

  @Get(':id')
  getMenu(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Get()
  getRestaurantMenus(@Query() findMenusDto: FindMenusDto) {
    return this.menusService.findAllByRestaurant(findMenusDto.restaurant)
  }

  @Patch(':id/activate')
  activateMenu(@Param('id') id: string) {
    return this.menusService.activate(id);
  }

  @Patch(':id/disable')
  disableMenu(@Param('id') id: string) {
    return this.menusService.disable(id);
  }

  @Patch(':id')
  updateMenu(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}