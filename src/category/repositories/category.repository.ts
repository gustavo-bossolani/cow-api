import { EntityRepository, Repository } from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { DefineError } from 'src/shared/models/define-error.model';

import { FilterCategoryDto } from '../dto/filter-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

import { Category } from 'src/category/entity/category.entity';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  async filterBy(filter: FilterCategoryDto): Promise<Category> {
    const { id, name } = filter;

    // TODO: fazer validação com class-validator
    if (!Object.keys(filter).length) {
      throw new BadRequestException(
        new DefineError('Isert values to search category.', 400),
      );
    }

    let category: Category;

    if (id) {
      category = await this.findOne({ id });
    }

    if (name) {
      category = await this.findOne({ name });
    }

    if (!category)
      throw new NotFoundException(new DefineError('Category not found.', 404));

    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, color } = createCategoryDto;

    const found = await this.findOne({ name });

    if (found) {
      throw new UnauthorizedException(
        new DefineError('Category already exists.', 401),
      );
    }

    const category = this.create({ name, color });

    await this.save(category);

    return category;
  }
}

export { CategoryRepository };
