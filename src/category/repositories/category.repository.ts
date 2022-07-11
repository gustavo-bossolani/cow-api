import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { DefineError } from 'src/shared/models/define-error.model';

import { FilterCategoryDto } from '../dto/filter-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

import { User } from 'src/user/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  private logger = new Logger('CategoryRepository');

  async filterBy(filter: FilterCategoryDto, user: User): Promise<Category> {
    this.logger.log('Validating filters.');

    const { id, name } = filter;

    let category: Category;

    if (id) {
      category = await this.findOne({ id, user });
    }

    if (name) {
      category = await this.findOne({ name, user });
    }

    if (!category) {
      this.logger.error('Category not found.');
      throw new NotFoundException(new DefineError('Category not found.', 404));
    }

    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    this.logger.log('Searching for a cateogory.');

    const { name, color } = createCategoryDto;

    const found = await this.findOne({ name, user });

    if (found) {
      this.logger.error('Category already exists.');

      throw new UnauthorizedException(
        new DefineError('Category already exists.', 401),
      );
    }

    const category = this.create({ name, color, user });

    await this.save(category);
    this.logger.log('Category created.');

    return category;
  }
}

export { CategoryRepository };
