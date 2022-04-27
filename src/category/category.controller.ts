import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

import { Category } from './entity/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<void> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('/by')
  getCategory(@Query() filter: FilterCategoryDto): Promise<Category> {
    return this.categoryService.getBy(filter);
  }

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
