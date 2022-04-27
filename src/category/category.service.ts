import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from 'src/category/repositories/category.repository';
import { DefineError } from 'src/shared/models/define-error.model';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getBy(filter: FilterCategoryDto): Promise<Category> {
    return await this.categoryRepository.filterBy(filter);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    await this.categoryRepository.createCategory(createCategoryDto);
  }

  async delete(id: string): Promise<void> {
    const deleteStatement = await this.categoryRepository.delete({ id });

    if (!deleteStatement.affected) {
      throw new NotFoundException(new DefineError('Category not found', 404));
    }
  }
}
