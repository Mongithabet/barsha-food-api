import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MenusService } from 'src/menus/services/menus.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { FilterApproveMenuDto } from '../../../menus/dto/filter-approve-menu.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-menus')
@Controller('back-office-menus')
export class BackOfficeMenusController {
  constructor(private readonly menusService: MenusService) { }

  @Get()
  findAll(@Query() filterApproveMenuDto: FilterApproveMenuDto) {
    return this.menusService.findAll(filterApproveMenuDto);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.menusService.approve(id);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.menusService.reject(id);
  }
}
