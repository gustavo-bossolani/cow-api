import { StatementController } from './statement.controller';
import { Module } from '@nestjs/common';
import { StatementService } from './statement.service';

@Module({
  providers: [StatementService],
  controllers: [StatementController],
})
export class StatementModule {}
