import {
  ApiHeaderOptions,
  ApiOperationOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

import { Category } from 'src/category/entity/category.entity';
import { Page } from 'src/shared/components/pagination/page.model';

// controller
const apiTags = 'Category';
const apiHeader: ApiHeaderOptions = {
  name: 'Authorization',
  example: 'Bearer token',
};
const apiInternalServerErrorResponseForController: ApiResponseOptions = {
  description: 'Internal server error',
};

// create category
const apiOperationForCreateCategory: ApiOperationOptions = {
  summary: 'Create category for a user.',
};
const apiUnauthorizedResponseForCreateCategory: ApiResponseOptions = {
  description: 'When a category defined by name already exists',
};
const apiBadRequestResponseForCreateCategory: ApiResponseOptions = {
  description: 'If name is not provided',
};
const apiResponseForCreateCategory: ApiResponseOptions = {
  status: 201,
  description: 'Category created',
};

// get category by
const apiOperationForGetCategory: ApiOperationOptions = {
  summary: 'Search category by name or id',
};
const apiNotFoundResponseForGetCategory: ApiResponseOptions = {
  description: 'When category is not found',
};
const apiResponseForGetCategory: ApiResponseOptions = {
  description: 'Found category',
  type: Category,
  status: 200,
};

// get all categories
const apiOperationForGetAll: ApiOperationOptions = {
  summary: 'Return all categories with pagination',
};
const apiBadRequestResponseForGetAll: ApiResponseOptions = {
  description: 'If page or limit is not defined',
};
const apiResponseForGetAll: ApiResponseOptions = {
  type: Page,
  description: 'Pagination of type T',
  status: 200,
};

// delete category
const apiOperationForDelete: ApiOperationOptions = {
  summary: 'Deletes selected category',
};
const apiNotFoundResponseForDelete: ApiResponseOptions = {
  description: 'When category is not found',
};
const apiResponseForDelete: ApiResponseOptions = {
  description: 'Confirm the deletion of a category',
  status: 204,
};

export {
  // controller
  apiTags,
  apiHeader,
  apiInternalServerErrorResponseForController,
  // create category
  apiOperationForCreateCategory,
  apiUnauthorizedResponseForCreateCategory,
  apiBadRequestResponseForCreateCategory,
  apiResponseForCreateCategory,
  // get category
  apiOperationForGetCategory,
  apiNotFoundResponseForGetCategory,
  apiResponseForGetCategory,
  // get all categories
  apiOperationForGetAll,
  apiBadRequestResponseForGetAll,
  apiResponseForGetAll,
  // delete category
  apiOperationForDelete,
  apiNotFoundResponseForDelete,
  apiResponseForDelete,
};
