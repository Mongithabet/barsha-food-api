import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items: CartItem[];
}
