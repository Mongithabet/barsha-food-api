import { Injectable } from '@nestjs/common';
import { ServingTimeRepository } from '../repositories/serving-time.repository';
import { CreateServingTimeDto } from '../dto/create-serving-time.dto';

@Injectable()
export class ServingTimesService {
    constructor(private servingTimeRepository: ServingTimeRepository) { }

    create = (createServingTimeDto: CreateServingTimeDto) => this.servingTimeRepository.save(createServingTimeDto)

    findAllByMenu = (menuId: string) => this.servingTimeRepository.find({
        where: {menu: menuId}
    })

    remove = (id: string) => this.servingTimeRepository.delete(id)
}
