import { Test, TestingModule } from '@nestjs/testing';
import { RestoOffersController } from './resto-offers.controller';

describe('RestoOffersController', () => {
  let controller: RestoOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoOffersController],
    }).compile();

    controller = module.get<RestoOffersController>(RestoOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
