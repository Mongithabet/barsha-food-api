import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { FindRestaurantsDto } from './dto/find-restaurants.dto';
import { RestaurantVerificationStatusEnum } from './enums/restaurant-verification-status.enum';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FilterApproveRestaurantDto } from './dto/filter-approve-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private restaurantRepository: RestaurantRepository) { }

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantRepository.save(createRestaurantDto);
  }

/*   findAll() {
    return this.restaurantRepository.find(
      {
        relations: ['logo']
      }
    );
  } */

  findAll(filterApproveRestaurantDto: FilterApproveRestaurantDto) {
    return this.restaurantRepository.find(
      {
        
        where: {
          verificationStatus: filterApproveRestaurantDto.verificationStatus
        }
      }
    );
  }
  
  findFilteredRestaurants = (findRestaurants: FindRestaurantsDto) =>
    this.restaurantRepository.findRestaurants(findRestaurants);

  findAllByOwnerId = (ownerId: string) => this.restaurantRepository.findRestaurantsByOwner(ownerId)


  findOne(id: string) {
    return this.restaurantRepository.findOne({
      where: { id },
      relations: ['logo', 'specialities', 'menus', 'menus.items', 'menus.items.image']
    });
  }


  update = (id: string, updateRestaurantDto: UpdateRestaurantDto) => {
    return this.restaurantRepository.update(id, updateRestaurantDto)
  }

  approve = (id: string) =>
    this.restaurantRepository.update(id, { verificationStatus: RestaurantVerificationStatusEnum.APPROVED })

  reject = (id: string) =>
    this.restaurantRepository.update(id, { verificationStatus: RestaurantVerificationStatusEnum.REJECTED })

  activate = async (id: string) => {
    const fetchedRestaurant = await this.restaurantRepository.findOneBy({ id });
    if (fetchedRestaurant.verificationStatus == RestaurantVerificationStatusEnum.REJECTED)
      throw new NotAcceptableException();
    return this.restaurantRepository.update(id, { isActive: true })
  }
}
