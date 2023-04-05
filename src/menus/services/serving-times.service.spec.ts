import { Test, TestingModule } from '@nestjs/testing';
import { ServingTimesService } from './serving-times.service';

describe('ServingTimesService', () => {
  let service: ServingTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServingTimesService],
    }).compile();

    service = module.get<ServingTimesService>(ServingTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
