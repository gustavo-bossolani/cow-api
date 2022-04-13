import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { Category } from './entity/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body('name') name: string): void {
    return this.categoryService.create(name);
  }

  @Get('/by')
  getCategory(@Query() filter: FilterCategoryDto): Category {
    const category = this.categoryService.getBy(filter);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  @Get()
  getAll(): Category[] {
    return this.categoryService.getAll();
  }
}
