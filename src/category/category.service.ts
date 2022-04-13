import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DefineError } from 'src/shared/models/define-error.model';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  getBy(filter: FilterCategoryDto): Category {
    const { id, name } = filter;

    let category: Category = null;

    if (!Object.keys(filter).length) {
      throw new BadRequestException(
        new DefineError('Isert values to search category.', 400),
      );
    }

    if (id) {
      category = this.categories.find((cat) => cat.id === id);
    }
    if (name) {
      category = this.categories.find(
        (cat) => cat.name.toLocaleUpperCase() === name.toLocaleUpperCase(),
      );
    }

    return category;
  }

  getAll(): Category[] {
    return this.categories;
  }

  create(name: string): void {
    const category = this.getBy({ name: name.toUpperCase() });

    if (category) {
      throw new UnauthorizedException(
        new DefineError('Category already exists.', 401),
      );
    }

    this.categories.push({
      id: new Date().getMilliseconds().toString(),
      name: name.toUpperCase(),
    });
  }
}
