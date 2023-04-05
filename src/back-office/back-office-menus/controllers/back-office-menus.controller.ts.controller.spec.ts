import { Test, TestingModule } from '@nestjs/testing';
import { BackOfficeMenusControllerTsController } from './back-office-menus.controller.ts.controller';

describe('BackOfficeMenusControllerTsController', () => {
  let controller: BackOfficeMenusControllerTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackOfficeMenusControllerTsController],
    }).compile();

    controller = module.get<BackOfficeMenusControllerTsController>(BackOfficeMenusControllerTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
