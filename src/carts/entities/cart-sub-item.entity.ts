import { ModifierItem } from "src/items/entities/modifier-item.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from './cart-item.entity';

@Entity()
export class CartSubItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ModifierItem, (modifierItem) => modifierItem.cartSubItems)
    modifierItem: ModifierItem;

    @ManyToOne(() => CartItem, (cartItem) => cartItem.cartSubItems)
    cartItem: CartItem;
}