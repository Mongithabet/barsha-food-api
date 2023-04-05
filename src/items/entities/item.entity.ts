import { Menu } from 'src/menus/entities/menu.entity';
import { ModifierItem } from './modifier-item.entity';
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Modifier } from './modifier.entity';
import { Category } from 'src/categories/entities/category.entity';
import { File } from "src/files/entities/file.entity";
import { ItemVerificationStatusEnum } from '../enums/item-verification-status.enum';

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  arName: string;

  @ManyToMany(() => Category, (category) => category.items)
  categories: Category[];

  @OneToMany(() => ModifierItem, (modifierItem) => modifierItem.item)
  modifierItems?: ModifierItem[];
}

@ChildEntity('CustomItem')
export class CustomItem extends Item {
  @ManyToOne(() => Menu, (menu) => menu.items)
  menu: Menu | string;

  @OneToOne(() => File)
  @JoinColumn()
  image?: File | string;

  @Column('enum', {
    enum: ItemVerificationStatusEnum,
    default: ItemVerificationStatusEnum.INREVIEW
  })
  verificationStatus: ItemVerificationStatusEnum;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  quantity?: number;

  @Column({
    default: false
  })
  isActive: boolean;
}

@ChildEntity('ComoboItem')
export class ComboItem extends CustomItem {

  @OneToMany(() => Variation, (variation) => variation.comboItem)
  variations: Variation[];

  @Column()
  variationTitle: string;

  @Column()
  arVariationTitle: string;
}

@ChildEntity('BuyableItem')
export class BuyableItem extends CustomItem {
  @OneToMany(() => Modifier, (modifier) => modifier.buyableItem)
  modifiers: Modifier[];
}

@ChildEntity('Variation')
export class Variation extends BuyableItem {
  @ManyToOne(() => ComboItem, (comboItem) => comboItem.variations)
  comboItem: ComboItem;
}