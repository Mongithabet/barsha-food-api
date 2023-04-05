import { Test, TestingModule } from '@nestjs/testing';
import { BackOfficeRestaurantsController } from './back-office-restaurants.controller.ts.controller';

describe('BackOfficeRestaurantsControllerTsController', () => {
  let controller: BackOfficeRestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackOfficeRestaurantsController],
    }).compile();

    controller = module.get<BackOfficeRestaurantsController>(BackOfficeRestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
