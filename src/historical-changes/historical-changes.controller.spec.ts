import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalChangesController } from './historical-changes.controller';
import { HistoricalChangesService } from './historical-changes.service';

describe('HistoricalChangesController', () => {
  let controller: HistoricalChangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalChangesController],
      providers: [HistoricalChangesService],
    }).compile();

    controller = module.get<HistoricalChangesController>(
      HistoricalChangesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
