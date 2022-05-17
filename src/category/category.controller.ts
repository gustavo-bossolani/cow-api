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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { ParseToNumber } from 'src/shared/pipes/parse-to-number/parse-to-number.decorator';

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { Page } from 'src/shared/components/pagination/page.model';
import { User } from 'src/user/entity/user.entity';
import { Category } from './entity/category.entity';

@ApiTags('Category')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', example: 'Bearer token' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
//swagger
@Controller('category')
@UseGuards(SessionAuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create category for a user.' })
  @ApiUnauthorizedResponse({
    description: 'When a category defined by name already exists',
  })
  @ApiBadRequestResponse({ description: 'If name is not provided' })
  @ApiResponse({ status: 201, description: 'Category created' })
  // swagger
  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoryService.create(createCategoryDto, user);
  }

  @ApiOperation({ summary: 'Search category by name or id' })
  @ApiNotFoundResponse({ description: 'When category is not found' })
  @ApiResponse({
    description: 'Found category',
    type: Category,
    status: 200,
  })
  //swagger
  @Get('/by')
  getCategory(
    @Query() filter: FilterCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getBy(filter, user);
  }

  @ApiOperation({ summary: 'Return all categories with pagination' })
  @ApiBadRequestResponse({ description: 'If page or limit is not defined' })
  @ApiResponse({ type: Page, description: 'Pagination of type T', status: 200 })
  //swagger
  @Get()
  getAll(
    @GetUser() user: User,
    @Query(ParseToNumber) options: PaginatorOptionsDto,
  ): Promise<Page<Category>> {
    return this.categoryService.getCategories(user, options);
  }

  @ApiOperation({ summary: 'Deletes selected category' })
  @ApiNotFoundResponse({ description: 'When category is not found' })
  @ApiResponse({
    description: 'Confirm the deletion of a category',
    status: 204,
  })
  @ApiParam({ name: 'id' })
  // swagger
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.categoryService.delete(id, user);
  }
}
