import { Injectable, HttpException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepository } from './repositories/item.repository';
import { ComboItem, Variation, BuyableItem } from './entities/item.entity';
import { Modifier } from './entities/modifier.entity';
import { ModifierItem } from './entities/modifier-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CustomItemRepository } from './repositories/custom-item.repository';
import { FindItemsDto } from 'src/resto/resto-items/dtos/find-items.dto';
import { ModifierTypeEnum } from './enums/modifier-type.enum';
import { Menu } from 'src/menus/entities/menu.entity';
import { MenuVerificationStatusEnum } from 'src/menus/enums/menu-verification-status.enum';
import { ItemVerificationStatusEnum } from './enums/item-verification-status.enum';

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private customItemRepository: CustomItemRepository,
    @InjectDataSource() private dataSource: DataSource
  ) { }

  findAll = (findItemsDto: FindItemsDto) => this.customItemRepository.findItems(findItemsDto);

  async create(createItemDto: CreateItemDto) {
    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner()

    // establish real database connection using our new query runner
    await queryRunner.connect()

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      if (createItemDto.variations && createItemDto.variations.length > 0) {
        const comboItem = new ComboItem();
        comboItem.arName = createItemDto.arName;
        comboItem.name = createItemDto.name;
        comboItem.image = createItemDto.image;
        if (createItemDto.variationTitle) comboItem.variationTitle = createItemDto.variationTitle;
        if (createItemDto.arVariationTitle) comboItem.arVariationTitle = createItemDto.arVariationTitle;

        if (createItemDto.menu) {
          const fetchedMenu = await queryRunner.manager.findOne(Menu,
            { where: { id: createItemDto.menu } });
          if (!fetchedMenu) throw new NotFoundException()
          if (fetchedMenu.verificationStatus != MenuVerificationStatusEnum.APPROVED)
            throw new NotAcceptableException('Menu is not approved')

          comboItem.menu = fetchedMenu;
        } else {
          const fetchedDefaultMenu = await queryRunner.manager.findOne(Menu,
            { where: { id: createItemDto.menu, isDefault: true } });
          comboItem.menu = fetchedDefaultMenu;
        }

        if (createItemDto.categories)
          for (const category of createItemDto.categories) {
            const fetchedCategory = await queryRunner.manager.findOne(Category, { where: { id: category } });
            comboItem.categories.push(fetchedCategory);
          }

        const createdComboItem = await queryRunner.manager.save(ComboItem, comboItem);

        if (createItemDto.variations)
          for (const variationElem of createItemDto.variations) {
            const variation = new Variation();
            variation.arName = variationElem.arName;
            variation.name = variationElem.name;
            variation.price = variationElem.price;

            variation.comboItem = createdComboItem;
            const createdVariation = await queryRunner.manager.save(Variation, variation);

            if (variationElem.modifiers)
              for (const modifierElem of variationElem.modifiers) {
                const modifier = new Modifier();
                modifier.arName = modifierElem.arName;
                modifier.name = modifierElem.name;

                modifier.isMandatory = modifierElem.isMandatory;
                modifier.isMultipleChoice = modifierElem.isMultipleChoice;
                modifier.type = modifierElem.type;
                modifier.maxSelectionCount = modifierElem.maxSelectionCount;

                modifier.buyableItem = createdVariation;
                const createdModifier = await queryRunner.manager.save(Modifier, modifier);

                for (const modifierItemElem of modifierElem.modifierItems) {
                  const modifierItem = new ModifierItem();
                  modifierItem.arName = modifierItemElem.arName;
                  modifierItem.name = modifierItemElem.name;
                  modifierItem.price = modifierItemElem.price;

                  if (modifierItemElem.item) modifierItem.item = modifierItemElem.item;
                  modifierItem.modifier = createdModifier;
                  await queryRunner.manager.save(ModifierItem, modifierItem);
                }
              }
          }
      }
      else {
        const buyableItem = new BuyableItem();
        buyableItem.arName = createItemDto.arName;
        buyableItem.price = createItemDto.price;
        if (createItemDto.quantity) buyableItem.quantity = createItemDto.quantity;

        if (createItemDto.name) buyableItem.name = createItemDto.name;
        else buyableItem.name = createItemDto.arName;
        buyableItem.image = createItemDto.image;

        if (createItemDto.menu) {
          const fetchedMenu = await queryRunner.manager.findOne(Menu,
            { where: { id: createItemDto.menu } });
          if (!fetchedMenu) throw new NotFoundException()
          if (fetchedMenu.verificationStatus != MenuVerificationStatusEnum.APPROVED)
            throw new NotAcceptableException('Menu is not approved')
          buyableItem.menu = fetchedMenu;
        } else {
          const fetchedDefaultMenu = await queryRunner.manager.findOne(Menu,
            { where: { id: createItemDto.menu, isDefault: true } });
          buyableItem.menu = fetchedDefaultMenu;
        }

        if (createItemDto.categories)
          for (const category of createItemDto.categories) {
            const fetchedCategory = await queryRunner.manager.findOne(Category, { where: { id: category } });
            buyableItem.categories.push(fetchedCategory);
          }
        const createdBuyableItem = await queryRunner.manager.save(BuyableItem, buyableItem);


        if (createItemDto.modifiers)

          for (const modifierElem of createItemDto.modifiers) {
            const modifier = new Modifier();
            modifier.isMandatory = modifierElem.isMandatory;
            modifier.isMultipleChoice = modifierElem.isMultipleChoice;
            modifier.maxSelectionCount = modifierElem.maxSelectionCount;
            modifier.arName = modifierElem.arName;
            modifier.name = modifierElem.name;
            modifier.type = modifierElem.type;
            modifier.buyableItem = createdBuyableItem;
            const createdModifier = await queryRunner.manager.save(Modifier, modifier);

            for (const modifierItemElem of modifierElem.modifierItems) {
              const modifierItem = new ModifierItem();
              modifierItem.arName = modifierItemElem.arName;
              modifierItem.name = modifierItemElem.name;
              modifierItem.price = modifierItemElem.price;
              if (modifierItemElem.item) modifierItem.item = modifierItemElem.item;
              modifierItem.modifier = createdModifier;

              await queryRunner.manager.save(ModifierItem, modifierItem);
            }
          }
      }
      await queryRunner.commitTransaction();
    }
    catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, err.status);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
  }

  findRestaurantItems(restaurantId: string) {
    return this.customItemRepository.findCustomItems(restaurantId);
  }

  findCustomItem(id: string) {
    return this.customItemRepository.findOne({
      where: { id },
      relations: ['categories',
        'menu',
        'variations',
        'variations.modifiers',
        'variations.modifiers.modifierItems',
        'variations.modifiers.modifierItems.item',
        'image',
        'modifiers',
        'modifiers.modifierItems',
        'modifiers.modifierItems.item']
    });
  }

  approve = (id: string) =>
    this.customItemRepository.update(id, { verificationStatus: ItemVerificationStatusEnum.APPROVED })

  reject = (id: string) =>
    this.customItemRepository.update(id, { verificationStatus: ItemVerificationStatusEnum.REJECTED })

  activate = async (id: string) => {
    const fetchedItem = await this.customItemRepository.findOneBy({ id });
    if (fetchedItem.verificationStatus == ItemVerificationStatusEnum.REJECTED)
      throw new NotAcceptableException();
    return this.customItemRepository.update(id, { isActive: true })
  }

  disable = (id: string) => this.customItemRepository.update(id, { isActive: false })


  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
