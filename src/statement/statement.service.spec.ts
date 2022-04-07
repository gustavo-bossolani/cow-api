import { Test, TestingModule } from '@nestjs/testing';
import { StatementService } from './statement.service';

describe('StatementService', () => {
  let service: StatementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatementService],
    }).compile();

    service = module.get<StatementService>(StatementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
