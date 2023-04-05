import { Test, TestingModule } from '@nestjs/testing';
import { RestoRestaurantsController } from './resto-restaurants.controller';

describe('RestoRestaurantsController', () => {
  let controller: RestoRestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoRestaurantsController],
    }).compile();

    controller = module.get<RestoRestaurantsController>(RestoRestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
