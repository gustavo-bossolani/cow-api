import { Test, TestingModule } from '@nestjs/testing';
import { OverviewController } from './overview.controller';

describe('OverviewController', () => {
  let controller: OverviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverviewController],
    }).compile();

    controller = module.get<OverviewController>(OverviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
