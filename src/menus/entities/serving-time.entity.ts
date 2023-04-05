import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DaysEnum } from '../../shared/enums/days.enum';
import { Menu } from "./menu.entity";

@Entity()
export class ServingTime {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    time: string;

    @Column({
        type: 'enum',
        enum: DaysEnum,
    })
    day: DaysEnum;

    @ManyToOne(() => Menu, (menu) => menu.servingTimes)
    menu: Menu | string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}