import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { CartSubItem } from './cart-sub-item.entity';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;

    @OneToMany(() => CartSubItem, (cartSubItem) => cartSubItem.cartItem)
    cartSubItems: CartSubItem[];
}
