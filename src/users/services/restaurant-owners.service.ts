import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RestaurantOwnerRepository } from '../repositories/restaurant-owner.repository';

@Injectable()
export class RestaurantOwnersService {
    constructor(
        private restaurantOwnerRepository: RestaurantOwnerRepository,
        @InjectDataSource() private dataSource: DataSource) { }

    findOneByEmail = async (email: string) => this.restaurantOwnerRepository.findOne({ where: { email } });

    findOneByPhone = async (phone: string) => this.restaurantOwnerRepository.findOne({ where: { phone } });

    findAll = async () => this.restaurantOwnerRepository.find();
    findOne = async (id: string) => this.restaurantOwnerRepository.findOne({ where: { id } });
  
  
}
