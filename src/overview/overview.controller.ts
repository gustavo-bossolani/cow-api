import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { ParseToNumber } from 'src/shared/pipes/parse-to-number/parse-to-number.decorator';
import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { OverviewService } from './overview.service';

import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { User } from 'src/user/entity/user.entity';

@Controller('overview')
@UseGuards(SessionAuthGuard)
export class OverviewController {
  constructor(private service: OverviewService) {}

  @Get('/all')
  getStatementsOverviewAll(@GetUser() user: User) {
    return this.service.getStatementsOverViewAll(user);
  }

  @Get('/monthly/:month')
  getStatementsOverviewMonthly(
    @GetUser() user: User,
    @Query(ParseToNumber) options: PaginatorOptionsDto,
    @Param('month') month: number,
  ) {
    return this.service.getStatementsOverviewMonthly(month, user, options);
  }
}
