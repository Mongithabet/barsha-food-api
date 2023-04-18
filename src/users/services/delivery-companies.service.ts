import { Injectable } from '@nestjs/common';
import { DeliveryCompany } from '../entities/user.entity';
import { DeliveryCompanyRepository } from '../repositories/delivery-company.repository';

@Injectable()
export class DeliveryCompaniesService {
    constructor(private readonly deliveryCompaniesRepository: DeliveryCompanyRepository) { }


    findAll = async () => this.deliveryCompaniesRepository.find(
       );

    findOne = async (id: string) => this.deliveryCompaniesRepository.findOne({ where: { id } });

    update = async (deliveryCompany: Partial<DeliveryCompany>) => this.deliveryCompaniesRepository.save(deliveryCompany);

    
  



}

