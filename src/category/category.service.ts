import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from 'src/category/repositories/category.repository';
import { DefineError } from 'src/shared/models/define-error.model';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { User } from 'src/user/entity/user.entity';
import { Category } from './entity/category.entity';
import { Page } from 'src/shared/components/pagination/page.model';
import { Paginator } from 'src/shared/components/pagination/paginator.model';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getBy(filter: FilterCategoryDto, user: User): Promise<Category> {
    return await this.categoryRepository.filterBy(filter, user);
  }

  async getCategories(
    user: User,
    options: PaginatorOptionsDto,
  ): Promise<Page<Category>> {
    const { limit, page } = options;

    const [results, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip: Paginator.calculateOffset(page, limit),
      where: { user },
    });

    return new Page({ options, results, total });
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
