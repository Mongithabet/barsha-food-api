import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Modifier } from './modifier.entity';
import { Item } from './item.entity';
import { CartSubItem } from '../../carts/entities/cart-sub-item.entity';

@Entity()
export class ModifierItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  price: number;

  @Column()
  name: string;

  @Column()
  arName: string;

  @ManyToOne(() => Modifier, (modifier) => modifier.modifierItems, { nullable: false })
  modifier: Modifier;

  @ManyToOne(() => Item, (item) => item.modifierItems, {nullable: true})
  item: Item | string;

  @OneToMany(() => CartSubItem, (cartSubItem) => cartSubItem.modifierItem)
  cartSubItems: CartSubItem[];
}