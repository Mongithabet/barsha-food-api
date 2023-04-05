import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateSpecialityDto } from 'src/specialities/dto/create-speciality.dto';
import { UpdateSpecialityDto } from 'src/specialities/dto/update-speciality.dto';
import { SpecialitiesService } from 'src/specialities/specialities.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Back-office-specialities')
@Controller('bo-specialities')
export class BackOfficeSpecialitiesController {
    constructor(private readonly specialitiesService: SpecialitiesService) { }

    @Post()
    create(@Body() createSpecialityDto: CreateSpecialityDto) {
        return this.specialitiesService.create(createSpecialityDto);
    }

    @Get()
    findAll() {
        return this.specialitiesService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialityDto) {
        return this.specialitiesService.update(id, updateSpecialityDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.specialitiesService.remove(id);
    }
}
