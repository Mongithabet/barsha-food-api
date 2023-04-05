import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantOwnersService } from './restaurant-owners.service';

describe('RestaurantOwnersService', () => {
  let service: RestaurantOwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantOwnersService],
    }).compile();

    service = module.get<RestaurantOwnersService>(RestaurantOwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
