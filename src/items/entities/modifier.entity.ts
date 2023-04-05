import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ModifierItem } from './modifier-item.entity';
import { BuyableItem } from './item.entity';
import { ModifierTypeEnum } from '../enums/modifier-type.enum';

@Entity()
export class Modifier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  arName: string;

  @Column({
    type: 'enum',
    enum: ModifierTypeEnum,
  })
  type: ModifierTypeEnum;

  @Column()
  isMandatory: boolean;

  @Column()
  isMultipleChoice: boolean;

  @Column()
  maxSelectionCount: number;

  @OneToMany(() => ModifierItem, (modifierItem) => modifierItem.modifier)
  modifierItems: ModifierItem[];

  @ManyToOne(() => BuyableItem, (buyableItem) => buyableItem.modifiers)
  buyableItem: BuyableItem;
}