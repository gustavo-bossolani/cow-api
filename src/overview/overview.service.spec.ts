import { Test, TestingModule } from '@nestjs/testing';
import { OverviewService } from './overview.service';

describe('OverviewService', () => {
  let service: OverviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverviewService],
    }).compile();

    service = module.get<OverviewService>(OverviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
