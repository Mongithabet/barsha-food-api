import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { FindItemsDto } from 'src/resto/resto-items/dtos/find-items.dto';
import { Repository } from 'typeorm';
import { CustomItem } from '../entities/item.entity';

@CustomRepository(CustomItem)
export class CustomItemRepository extends Repository<CustomItem> {
    async findCustomItems(restaurantId: string) {
        return this.createQueryBuilder('items')
            .leftJoinAndSelect('items.image', 'image')
            .leftJoinAndSelect('items.variations', 'variations')
            .leftJoinAndSelect('variations.modifiers', 'variationModifiers')
            .leftJoinAndSelect('variationModifiers.modifierItems', 'variationModifierItems')
            .leftJoinAndSelect('items.modifiers', 'modifiers')
            .leftJoinAndSelect('modifiers.modifierItems', 'modifierItems')
            .leftJoinAndSelect('items.menu', 'menu')
            .leftJoin('menu.restaurant', 'restaurant')
            .where('restaurant.id = :restaurantId', { restaurantId })
            .getMany();
    }

    async findItems(findItemsDto: FindItemsDto) {
        const query = this.createQueryBuilder('items')
            .leftJoinAndSelect('items.image', 'image')
            .leftJoinAndSelect('items.variations', 'variations')
            .leftJoinAndSelect('variations.modifiers', 'variationModifiers')
            .leftJoinAndSelect('variationModifiers.modifierItems', 'variationModifierItems')
            .leftJoinAndSelect('items.modifiers', 'modifiers')
            .leftJoinAndSelect('modifiers.modifierItems', 'modifierItems')
            .leftJoinAndSelect('items.menu', 'menu')
            .leftJoin('menu.restaurant', 'restaurant')
            .where('restaurant.id = :restaurant', { restaurant: findItemsDto.restaurant });
        if (findItemsDto.menu)
            query.andWhere('menu.id = :menu', { menu: findItemsDto.menu });
        return query.getMany();
    }
}
