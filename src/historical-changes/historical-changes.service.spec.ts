import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalChangesService } from './historical-changes.service';

describe('HistoricalChangesService', () => {
  let service: HistoricalChangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricalChangesService],
    }).compile();

    service = module.get<HistoricalChangesService>(HistoricalChangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
