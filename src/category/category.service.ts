import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from 'src/category/repositories/category.repository';
import { DefineError } from 'src/shared/models/define-error.model';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

import { User } from 'src/user/entity/user.entity';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getBy(filter: FilterCategoryDto, user: User): Promise<Category> {
    return await this.categoryRepository.filterBy(filter, user);
  }

  async getAll(user: User): Promise<Category[]> {
    return await this.categoryRepository.find({ user });
  }

  async create(createCategoryDto: CreateCategoryDto, user): Promise<void> {
    await this.categoryRepository.createCategory(createCategoryDto, user);
  }

  async delete(id: string, user: User): Promise<void> {
    const deleteStatement = await this.categoryRepository.delete({ id, user });

    if (!deleteStatement.affected) {
      throw new NotFoundException(new DefineError('Category not found', 404));
    }
  }
}
