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

import {
  apiBadRequestResponseForCreateCategory,
  apiBadRequestResponseForGetAll,
  apiHeader,
  apiInternalServerErrorResponseForController,
  apiNotFoundResponseForDelete,
  apiNotFoundResponseForGetCategory,
  apiOperationForCreateCategory,
  apiOperationForDelete,
  apiOperationForGetAll,
  apiOperationForGetCategory,
  apiResponseForCreateCategory,
  apiResponseForDelete,
  apiResponseForGetAll,
  apiResponseForGetCategory,
  apiTags,
  apiUnauthorizedResponseForCreateCategory,
} from './config/swagger/swagger.config';

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

@ApiTags(apiTags)
@ApiBearerAuth()
@ApiHeader(apiHeader)
@ApiInternalServerErrorResponse(apiInternalServerErrorResponseForController)
//swagger
@Controller('category')
@UseGuards(SessionAuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation(apiOperationForCreateCategory)
  @ApiUnauthorizedResponse(apiUnauthorizedResponseForCreateCategory)
  @ApiBadRequestResponse(apiBadRequestResponseForCreateCategory)
  @ApiResponse(apiResponseForCreateCategory)
  // swagger
  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoryService.create(createCategoryDto, user);
  }

  @ApiOperation(apiOperationForGetCategory)
  @ApiNotFoundResponse(apiNotFoundResponseForGetCategory)
  @ApiResponse(apiResponseForGetCategory)
  //swagger
  @Get('/by')
  getCategory(
    @Query() filter: FilterCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getBy(filter, user);
  }

  @ApiOperation(apiOperationForGetAll)
  @ApiBadRequestResponse(apiBadRequestResponseForGetAll)
  @ApiResponse(apiResponseForGetAll)
  //swagger
  @Get()
  getAll(
    @GetUser() user: User,
    @Query(ParseToNumber) options: PaginatorOptionsDto,
  ): Promise<Page<Category>> {
    return this.categoryService.getCategories(user, options);
  }

  @ApiOperation(apiOperationForDelete)
  @ApiNotFoundResponse(apiNotFoundResponseForDelete)
  @ApiResponse(apiResponseForDelete)
  @ApiParam({ name: 'id' })
  // swagger
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.categoryService.delete(id, user);
  }
}
