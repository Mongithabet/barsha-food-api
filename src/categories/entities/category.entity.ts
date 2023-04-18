import { Item } from 'src/items/entities/item.entity';
import { Speciality } from 'src/specialities/entities/speciality.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Item, (item) => item.categories)
  @JoinTable()
  items: Item[];

  @Column({length:100})
  name:string;

  @Column({length:100})
  arName:string;



  @ManyToMany(() => Speciality, (speciality) => speciality.categories,{onDelete: 'CASCADE',onUpdate:'CASCADE',eager:true})
  specialities: Speciality[] | string[];

  
}
