import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { CategoryModule } from 'src/category/category.module';

import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';

import { StatementRepository } from './repositories/statement.repository';

import { Statement } from 'src/statement/entities/statement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatementRepository, Statement]),
    CategoryModule,
    AuthModule,
  ],
  providers: [StatementService],
  controllers: [StatementController],
  exports: [TypeOrmModule],
})
export class StatementModule {}
