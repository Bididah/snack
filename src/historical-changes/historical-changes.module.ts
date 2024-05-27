import { Module } from '@nestjs/common';
import { HistoricalChangesService } from './historical-changes.service';
import { HistoricalChangesController } from './historical-changes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricalChange } from './entities/historical-change.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricalChange])],
  controllers: [HistoricalChangesController],
  providers: [HistoricalChangesService],
})
export class HistoricalChangesModule {}
