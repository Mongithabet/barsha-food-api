import { ApiResponseProperty } from '@nestjs/swagger';
import { RestaurantToEmployee } from 'src/restaurants/entities/restaurant-to-employee.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { File } from "src/files/entities/file.entity";

import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from 'typeorm';
import { AdminRoleEnum } from '../enums/admin-role.enum';
import { EmployeeRoleEnum } from '../enums/employee-role.enum';

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  lastName: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity('Customer')
export class Customer extends User {
  @Column({
    nullable: true,
  })
  otp?: string;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;
}

@ChildEntity('DeliveryMan')
export class DeliveryMan extends User {
  @Column({
    nullable: true,
  })
  otp?: string;
  
  @ManyToOne(() => DeliveryCompany, (deliveryCompany) => deliveryCompany.deliveryMans)
  company: DeliveryCompany | string;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;
  
  @Column({ length: 60 })
  password: string;
}


@ChildEntity('DeliveryCompany')
export class DeliveryCompany extends User {
  @Column({
    nullable: true,
  })
  otp?: string;


  @OneToMany(() => DeliveryMan, (deliveryMan) => deliveryMan.company,{eager:true})
  deliveryMans: DeliveryMan[];

  @Column({
    nullable: true,        
  })
  commercialRegister: string;
  
  @Column()
  expirationDate: Date;

  @OneToOne(() => File)
  @ApiResponseProperty({ type: File })
  @JoinColumn()
  image: File | string;


  @Column({ length: 60 })
  password: string;
}



@ChildEntity('RestaurantOwner')
export class RestaurantOwner extends User {
  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @Column({ length: 60 })
  password: string;
}


@ChildEntity('Employee')  
export class Employee extends User {
  @Column('enum', {
    enum: EmployeeRoleEnum,
  })
  role: EmployeeRoleEnum;

  @OneToMany(() => RestaurantToEmployee, (restaurantToEmployee) => restaurantToEmployee.employee)
  restaurantToEmployees: RestaurantToEmployee[];

  @Column({ length: 60 })
  password: string;
}

@ChildEntity('Admin')
export class Admin extends User {
  @Column({
    type: 'enum',
    enum: AdminRoleEnum,
  })
  role: AdminRoleEnum;

  @Column({ length: 60 })
  password: string;
}
