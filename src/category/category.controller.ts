import { CategoryService } from './category.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { Category } from './entity/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body('name') name: string): void {
    return this.categoryService.create(name);
  }

  @Get()
  getCategory(@Query() filter: FilterCategoryDto): Category {
    return this.categoryService.getBy(filter);
  }

  @Get('/all')
  getAll(): Category[] {
    return this.categoryService.getAll();
  }
}
