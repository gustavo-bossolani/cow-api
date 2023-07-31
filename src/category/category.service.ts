import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from 'src/category/repositories/category.repository';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

import { User } from 'src/user/entity/user.entity';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  private logger = new Logger('CategoryService');

  constructor(private categoryRepository: CategoryRepository) {}

  async getBy(filter: FilterCategoryDto, user: User): Promise<Category> {
    return await this.categoryRepository.filterBy(filter, user);
  }

  async getCategories(user: User): Promise<Category[]> {
    return this.categoryRepository.find({ where: { user } });
  }

  async create(createCategoryDto: CreateCategoryDto, user): Promise<void> {
    await this.categoryRepository.createCategory(createCategoryDto, user);
  }

  async delete(id: string, user: User): Promise<void> {
    this.logger.log('Searching category for delete.');

    const deleteStatement = await this.categoryRepository.delete({ id, user });
    this.logger.log('Category deleted.');

    if (!deleteStatement.affected) {
      this.logger.error('Category not found.');

      throw new NotFoundException('Category not found');
    }
  }
}
