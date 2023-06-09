import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenusController } from './resto-menus.controller';
import { RestoMenusService } from './resto-menus.service';

describe('RestoMenusController', () => {
  let controller: RestoMenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoMenusController],
      providers: [RestoMenusService],
    }).compile();

    controller = module.get<RestoMenusController>(RestoMenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
