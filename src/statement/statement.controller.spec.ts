import { Test, TestingModule } from '@nestjs/testing';
import { StatementController } from './statement.controller';

describe('StatementController', () => {
  let controller: StatementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatementController],
    }).compile();

    controller = module.get<StatementController>(StatementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
