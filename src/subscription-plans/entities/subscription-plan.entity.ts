import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SubscriptionPlan {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    monthPrice: number;

    @Column()
    annualPrice: number;

    @Column()
    posCount: number;
}
