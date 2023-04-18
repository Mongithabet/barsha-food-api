import { Injectable } from '@nestjs/common';
import { DeliveryMan } from '../entities/user.entity';
import { DeliveryManRepository } from '../repositories/delivery-man.repository';
import { CreateDeliveryManDto } from '../dto/create-delivery-man.dto';

@Injectable()
export class DeliveryMansService {
    constructor(private readonly deliveryManRepository: DeliveryManRepository) { }

    findAll = async () => this.deliveryManRepository.find();

    findOne = async (id: string) => this.deliveryManRepository.findOne({ where: { id } });

    update = async (deliveryMan: Partial<DeliveryMan>) => this.deliveryManRepository.save(deliveryMan);

    findOneByEmail = async (email: string) => this.deliveryManRepository.findOne({ where: { email } });

    findOneByPhone = async (phone: string) => this.deliveryManRepository.findOne({ where: { phone } });
      

      
    findOneByCompany = async (company: string) => this.deliveryManRepository.findOne({ where: { company } });

}
