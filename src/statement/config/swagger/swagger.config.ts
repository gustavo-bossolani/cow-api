import {
  ApiHeaderOptions,
  ApiOperationOptions,
  ApiParamOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { Page } from 'src/shared/components/pagination/page.model';

// controller
const apiTagsForStatementController = 'Statement';
const apiHeaderForStatementController: ApiHeaderOptions = {
  name: 'Authorization',
  example: 'Bearer token',
};
const apiInternalServerErrorResponseForStatementController: ApiResponseOptions =
  { description: 'Internal server error' };

// create statement
const apiOperationForCreateStatement: ApiOperationOptions = {
  summary: 'Create statement for a user.',
};
const apiBadRequestResponseForCreateStatement: ApiResponseOptions = {
  description: 'If CreateStatementDto rules is not respected',
};
const apiNotFoundResponseForCreateStatement: ApiResponseOptions = {
  description:
    'Return only if a category id is passed, when it is the system will try to find a category with provided id',
};
const apiResponseForCreateStatement: ApiResponseOptions = {
  status: 201,
  description: 'Statement created',
};

// get alls tatements
const apiOperationForGetAll: ApiOperationOptions = {
  summary: 'Recover all statements with paginator',
};
const apiBadRequestResponseForGetAll: ApiResponseOptions = {
  description: 'If PaginatorOptionsDto rules is not respected',
};
const apiResponseForGetAll: ApiResponseOptions = {
  status: 200,
  description: 'Statement created',
  type: Page,
};

// delete statement by id
const apiOperationForDeleteStatement: ApiOperationOptions = {
  summary: 'Delete a statement for a given id',
};
const apiNotFoundResponseForDeleteStatement: ApiResponseOptions = {
  description: 'When statement is not found for the given id',
};
const apiParamForDeleteStatement: ApiParamOptions = {
  name: 'id',
  example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e',
};
const apiResponseForDeleteStatement: ApiResponseOptions = {
  status: 204,
  description: 'Statement deleted',
};

// updates tatement
const apiOperationForUpdateStatement: ApiOperationOptions = {
  summary: 'Update a statement for a given id',
};
const apiNotFoundResponseForUpdateStatement: ApiResponseOptions = {
  description: 'When statement is not found for the given id',
};
const apiBadRequestResponseForUpdateStatement: ApiResponseOptions = {
  description: 'If UpdateStatementDto rules is not respected',
};
const apiParamForUpdateStatement: ApiParamOptions = {
  name: 'id',
  example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e',
};
const apiResponseForUpdateStatement: ApiResponseOptions = {
  status: 204,
  description: 'Statement deleted',
};

export {
  // controller
  apiTagsForStatementController,
  apiHeaderForStatementController,
  apiInternalServerErrorResponseForStatementController,
  // create statement
  apiOperationForCreateStatement,
  apiBadRequestResponseForCreateStatement,
  apiNotFoundResponseForCreateStatement,
  apiResponseForCreateStatement,
  // get alls tatements
  apiOperationForGetAll,
  apiBadRequestResponseForGetAll,
  apiResponseForGetAll,
  // delete statement by id
  apiOperationForDeleteStatement,
  apiNotFoundResponseForDeleteStatement,
  apiParamForDeleteStatement,
  apiResponseForDeleteStatement,
  // updates tatement
  apiOperationForUpdateStatement,
  apiNotFoundResponseForUpdateStatement,
  apiBadRequestResponseForUpdateStatement,
  apiParamForUpdateStatement,
  apiResponseForUpdateStatement,
};
