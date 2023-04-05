import { TableInheritance, Entity, PrimaryGeneratedColumn, ChildEntity, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { RestaurantPlatformDiscount } from '../../restaurants/entities/restaurant-platform-discount.entity';
import { File } from "src/files/entities/file.entity";

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export abstract class Offer {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @OneToOne(() => File)
    @JoinColumn()
    image: File | string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@ChildEntity('Discount')
export class Discount extends Offer {

    @Column()
    percentage: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}

@ChildEntity('ProductDiscount')
export class ProductDiscount extends Discount {
    @OneToMany(() => RestaurantPlatformDiscount,
        (restaurantPlatformDiscount) => restaurantPlatformDiscount.platformDiscount)
    restaurants: RestaurantPlatformDiscount[];

    @Column({ nullable: true })
    offerStartTime: string;

    @Column({ nullable: true })
    offerEndTime: string;
}

@ChildEntity('DeliveryDiscount')
export class DeliveryDiscount extends Discount {
}