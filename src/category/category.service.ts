import { Injectable, UnauthorizedException } from '@nestjs/common';

import { DefineError } from 'src/shared/models/define-error.model';

import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  getBy(name: string) {
    const found = this.categories.find((cat) => cat.name === name);
    if (found) {
      return found;
    }
    throw new UnauthorizedException(
      new DefineError('Category already Exists', 401),
    );
  }

  create(name: string) {
    this.getBy(name);

    this.categories.push({
      id: new Date().getMilliseconds().toString(),
      name: name.toUpperCase(),
    });
  }
}
