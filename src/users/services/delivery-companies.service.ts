import { Injectable } from '@nestjs/common';
import { DeliveryCompany } from '../entities/user.entity';
import { DeliveryCompanyRepository } from '../repositories/delivery-company.repository';

@Injectable()
export class DeliveryCompaniesService {
    constructor(private readonly deliveryCompanyRepository: DeliveryCompanyRepository) { }

    findAll = async () => this.deliveryCompanyRepository.find(
        {relations:['']});

    findOne = async (id: string) => this.deliveryCompanyRepository.findOne({ where: { id } });

    update = async (deliveryCompany: Partial<DeliveryCompany>) => this.deliveryCompanyRepository.save(deliveryCompany);

}

