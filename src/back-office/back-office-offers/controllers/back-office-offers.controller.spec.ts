import { Test, TestingModule } from '@nestjs/testing';
import { BackOfficeOffersController } from './back-office-offers.controller';

describe('BackOfficeOffersController', () => {
  let controller: BackOfficeOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackOfficeOffersController],
    }).compile();

    controller = module.get<BackOfficeOffersController>(BackOfficeOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
