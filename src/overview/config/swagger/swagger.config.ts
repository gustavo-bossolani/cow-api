import {
  ApiHeaderOptions,
  ApiResponseOptions,
  ApiOperationOptions,
} from '@nestjs/swagger';

import { OverviewAllDto } from 'src/overview/dto/overview-all.dto';
import { OverviewMonthlyDto } from 'src/overview/dto/overview-monthly.dto';

// controller
const apiTag = 'Overview';
const apiHeader: ApiHeaderOptions = {
  name: 'Authorization',
  example: 'Bearer token',
};
const apiInternalServerErrorResponse: ApiResponseOptions = {
  description: 'Internal server error',
};

// overview all method
const apiOperationForOverviewAll: ApiOperationOptions = {
  summary:
    'Filter all statements with installments and they respective categories',
};
const apiResponseForOverviewAll: ApiResponseOptions = {
  type: () => OverviewAllDto,
  status: 200,
};

// overview monthly method
const apiOperationForOverviewMonthly: ApiOperationOptions = {
  summary: 'Filter all statements monthly',
};
const apiResponseForOverviewMonthly: ApiResponseOptions = {
  type: () => OverviewMonthlyDto,
  status: 200,
};

export {
  // controller
  apiTag,
  apiHeader,
  apiInternalServerErrorResponse,
  // overview all method
  apiOperationForOverviewAll,
  apiResponseForOverviewAll,
  // overview monthly method
  apiOperationForOverviewMonthly,
  apiResponseForOverviewMonthly,
};
