import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { SpecialityRepository } from './repositories/speciality.repository';

@Injectable()
export class SpecialitiesService {
  constructor(private specialityRepository: SpecialityRepository) {

  }
  create(createSpecialityDto: CreateSpecialityDto) {
    return this.specialityRepository.save(createSpecialityDto);
  }

  findAll() {
    return this.specialityRepository.find({
      relations: ['image']
    });
  }

  update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    return this.specialityRepository.update(id, updateSpecialityDto)
  }

  remove(id: string) {
    return this.specialityRepository.delete(id);
  }
}
