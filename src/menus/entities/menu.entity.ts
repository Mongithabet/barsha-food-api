import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomItem, BuyableItem, ComboItem } from '../../items/entities/item.entity';
import { MenuVerificationStatusEnum } from '../enums/menu-verification-status.enum';
import { ServingTimeEnum } from '../enums/serving-time.enum';
import { ServingTime } from './serving-time.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  arName: string;

  @Column({
    default: false
  })
  isDefault: boolean;

  @Column('enum', {
    enum: MenuVerificationStatusEnum,
    default: MenuVerificationStatusEnum.APPROVED
  })
  verificationStatus: MenuVerificationStatusEnum;

  @Column({
    default: true
  })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ServingTimeEnum,
    default: ServingTimeEnum.FULL
  })
  availabilityType: ServingTimeEnum;

  @OneToMany(() => (CustomItem), (item) => item.menu)
  items: CustomItem[] | BuyableItem[] | ComboItem[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
  restaurant: Restaurant | string;

  @OneToMany(() => ServingTime, (servingTime) => servingTime.menu)
  servingTimes: ServingTime[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}