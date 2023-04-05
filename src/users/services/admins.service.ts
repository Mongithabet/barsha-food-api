import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminsService {
    constructor(private readonly adminRepository: AdminRepository) { }

    findAll = async () => this.adminRepository.find();

    findOne = async (id: string) => this.adminRepository.findOne({ where: { id } });

    findOneByEmail = async (email: string) => this.adminRepository.findOne({ where: { email } });

    findOneByPhone = async (phone: string) => this.adminRepository.findOne({ where: { phone } });
}
