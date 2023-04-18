import { Menu } from 'src/menus/entities/menu.entity';
import { Speciality } from 'src/specialities/entities/speciality.entity';
import { RestaurantOwner } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RestaurantToEmployee } from './restaurant-to-employee.entity';
import { File } from "src/files/entities/file.entity";
import { RestaurantPlatformDiscount } from './restaurant-platform-discount.entity';
import { ApiResponseProperty } from '@nestjs/swagger';
import { RestaurantVerificationStatusEnum } from '../enums/restaurant-verification-status.enum';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  commercialRegister: string;
  
  @Column({
    nullable:true})
  expirationDate: Date;

  @OneToOne(() => File)
  @ApiResponseProperty({ type: File })
  @JoinColumn()
  image: File | string;

  @Column()
  street: string;

  @Column({
    nullable: true,
  })
  aptNumber?: string;


  @Column('enum', {
    enum: RestaurantVerificationStatusEnum,
    default: RestaurantVerificationStatusEnum.INREVIEW
  })

  verificationStatus: RestaurantVerificationStatusEnum;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @ManyToOne(() => RestaurantOwner, (restaurantOwner) => restaurantOwner.restaurants)
  owner: RestaurantOwner | string;

  @OneToMany(() => RestaurantToEmployee, (restaurantToEmployee) => restaurantToEmployee.restaurant)
  restaurantToEmployees: RestaurantToEmployee[];

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @OneToOne(() => File)
  @ApiResponseProperty({ type: File })
  @JoinColumn()
  logo: File | string;

  @ManyToMany(() => Speciality, (speciality) => speciality.restaurants)
  specialities: Speciality[] | string[];

  @OneToMany(() => RestaurantPlatformDiscount,
        (restaurantPlatformDiscount) => restaurantPlatformDiscount.restaurant)
  platformDiscounts: RestaurantPlatformDiscount[];

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}