import { Test, TestingModule } from '@nestjs/testing';
import { RestoItemsController } from './resto-items.controller';

describe('RestoItemsController', () => {
  let controller: RestoItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoItemsController],
      providers: [],
    }).compile();

    controller = module.get<RestoItemsController>(RestoItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
