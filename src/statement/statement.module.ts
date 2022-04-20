import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';

import { StatementRepository } from './repositories/statement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StatementRepository])],
  providers: [StatementService],
  controllers: [StatementController],
})
export class StatementModule {}
