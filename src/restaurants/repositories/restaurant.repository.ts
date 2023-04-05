import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { FindRestaurantsDto } from '../dto/find-restaurants.dto';

@CustomRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
    async findRestaurantsByOwner(ownerId: string) {
        return this.createQueryBuilder('restaurants')
            .leftJoin('restaurants.owner', 'owner')
            .where('owner.id = :ownerId', { ownerId })
            .getMany();
    }

    async findRestaurants(findRestaurantsDto: FindRestaurantsDto) {
        const query = this.createQueryBuilder('restaurants')
            .leftJoinAndSelect('restaurants.logo', 'logo')
            .leftJoin('restaurants.specialities', 'specialities');
        if (findRestaurantsDto.speciality) query.andWhere('specialities.id = :specialityId',
            { specialityId: findRestaurantsDto.speciality });
        return query.getMany();
    }
}
