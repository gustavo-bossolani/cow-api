import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

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

import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';

import { User } from 'src/user/entity/user.entity';
import { Category } from './entity/category.entity';
import { Throttle } from '@nestjs/throttler';

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
  @Throttle(20, 60)
  @Get('/by')
  async getCategory(
    @Query() filter: FilterCategoryDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Category> {
    const category = await this.categoryService.getBy(filter, user);

    if (!category) {
      response.status(HttpStatus.NO_CONTENT);
    }

    return category;
  }

  @ApiOperation(apiOperationForGetAll)
  @ApiBadRequestResponse(apiBadRequestResponseForGetAll)
  @ApiResponse(apiResponseForGetAll)
  //swagger
  @Get()
  getAll(@GetUser() user: User): Promise<Category[]> {
    return this.categoryService.getCategories(user);
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
