import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { CategoryService } from './category.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

import { User } from 'src/user/entity/user.entity';
import { Category } from './entity/category.entity';
import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('category')
@UseGuards(SessionAuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoryService.create(createCategoryDto, user);
  }

  @Get('/by')
  getCategory(
    @Query() filter: FilterCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getBy(filter, user);
  }

  @Get()
  getAll(@GetUser() user: User): Promise<Category[]> {
    return this.categoryService.getAll(user);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.categoryService.delete(id, user);
  }
}
