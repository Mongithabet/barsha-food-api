import { Test, TestingModule } from '@nestjs/testing';
import { RestoSpecialitiesController } from './resto-specialities.controller';

describe('RestoSpecialitiesController', () => {
  let controller: RestoSpecialitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoSpecialitiesController],
    }).compile();

    controller = module.get<RestoSpecialitiesController>(RestoSpecialitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
