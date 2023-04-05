
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { ProductDiscount } from '../../offers/entities/offer.entity';

@Entity()
export class RestaurantPlatformDiscount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.platformDiscounts)
    restaurant: Restaurant;

    @ManyToOne(() => ProductDiscount, (platformDiscount) => platformDiscount.restaurants)
    platformDiscount: ProductDiscount;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
