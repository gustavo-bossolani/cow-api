import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CategoryRepository } from 'src/category/repositories/category.repository';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { Category } from 'src/category/entity/category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
