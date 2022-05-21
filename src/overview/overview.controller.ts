import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ParseToNumber } from 'src/shared/pipes/parse-to-number/parse-to-number.decorator';
import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { OverviewService } from './overview.service';

import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';
import { OverviewAllDto } from './dto/overview-all.dto';

import { User } from 'src/user/entity/user.entity';
import { Statement } from 'src/statement/entities/statement.entity';
import { OverviewMonthlyDto } from './dto/overview-monthly.dto';

@ApiTags('Overview')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', example: 'Bearer token' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
//swagger
@Controller('overview')
@UseGuards(SessionAuthGuard)
export class OverviewController {
  constructor(private service: OverviewService) {}

  @ApiOperation({
    summary:
      'Filter all statements with installments and they respective categories',
  })
  @ApiResponse({ type: () => OverviewAllDto, status: 200 })
  //swagger
  @Get('/all')
  getStatementsOverviewAll(@GetUser() user: User): Promise<OverviewAllDto> {
    return this.service.getStatementsOverviewAll(user);
  }

  @ApiResponse({ type: () => OverviewMonthlyDto, status: 200 })
  //swagger
  @Get('/monthly/:month/:year')
  getStatementsOverviewMonthly(
    @GetUser() user: User,
    @Query(ParseToNumber) options: PaginatorOptionsDto,
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<OverviewMonthlyDto<Statement>> {
    return this.service.getStatementsOverviewMonthly(
      month,
      year,
      user,
      options,
    );
  }
}
