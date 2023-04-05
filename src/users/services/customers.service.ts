import { forwardRef, Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { RegisterCustomerDto } from 'src/auth/dto/register-customer.dto';
import { CustomerRepository } from '../repositories/customer.repository';
import { CartsService } from '../../carts/carts.service';
import { Customer } from '../entities/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import * as bcrypt from 'bcrypt';
import { UpdateLocationDto } from '../dto/update-location.dto';
import { UpdateActiveDto } from '../dto/update-active.dto';

@Injectable()
export class CustomersService {
    constructor(private readonly customerRepository: CustomerRepository,
        @Inject(forwardRef(() => CartsService))
        private readonly cartsService: CartsService,
        @InjectDataSource() private dataSource: DataSource) { }


    findAll = async () => this.customerRepository.find();
    findOne = async (id: string) => this.customerRepository.findOne({ where: { id } });


    create = async (registerCustomerDto: RegisterCustomerDto) => {
        const fetchCustomer = await this.findOneByPhone(registerCustomerDto.phone);
        if (fetchCustomer) throw new NotAcceptableException('مستخدم مسجل بالفعل بالبريد الإلكتروني / الهاتف');

        // create a new query runner
        const queryRunner = this.dataSource.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()

        // lets now open a new transaction:
        await queryRunner.startTransaction()
        try {
            // execute some operations on this transaction:
            const createdCart = await queryRunner.manager.save(Cart, new Cart())
            const createdCustomer = await queryRunner.manager.save(Customer, { ...registerCustomerDto, cart: createdCart });

            // commit transaction now:
            await queryRunner.commitTransaction()
            if (createdCustomer) return createdCustomer;
        } catch (err) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction()
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release()
        }
    };


    updateLocation = async (customerId: string, updateLocationDto: UpdateLocationDto) => {
        const fetchedCustomer = await this.findOne(customerId);
        if(!fetchedCustomer) throw new NotFoundException()
        await this.customerRepository.update(fetchedCustomer.id, updateLocationDto);
    }


    updateActive= async (customerId: string, updateAvticeDto: UpdateActiveDto) => {
        const fetchedCustomer = await this.findOne(customerId);
        if(!fetchedCustomer) throw new NotFoundException()
        await this.customerRepository.update(fetchedCustomer.id, updateAvticeDto);
    }


    update = async (customer: Partial<Customer>) => this.customerRepository.save(customer);


    findOneByEmail = async (email: string) => this.customerRepository.findOne({ where: { email } });

    findOneByPhone = async (phone: string) => this.customerRepository.findOne({ where: { phone } });

    findOneByEmailOrPhone = async (email: string, phone: string) =>
        this.customerRepository.findOne(
            {
                where: [
                    { email: email },
                    { phone: phone }
                ]
            }
        );
}
