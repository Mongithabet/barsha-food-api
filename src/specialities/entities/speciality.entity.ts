import { ApiResponseProperty } from '@nestjs/swagger';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { File } from "src/files/entities/file.entity";
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Speciality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  name: string;

  @Column({
    unique: true
  })
  arName: string;

  @OneToOne(() => File)
  @ApiResponseProperty({ type: File })
  @JoinColumn()
  image: File | string;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.specialities)
  @JoinTable()
  restaurants: Restaurant[];
  
  @ManyToMany(() => Category, (category) => category.specialities)
  @JoinTable()
  categories: Category[];
  

}