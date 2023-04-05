import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';

@CustomRepository(Menu)
export class MenuRepository extends Repository<Menu> {
    async findMenusByRestaurant(restaurantId: string) {
        return this.createQueryBuilder('menus')
            .leftJoin('menus.restaurant', 'restaurant')
            .leftJoinAndSelect('menus.items', 'items')
            .leftJoinAndSelect('items.image', 'image')
            .where('restaurant.id = :restaurantId', { restaurantId })
            .getMany();
    }
}
