import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StatementRepository } from 'src/statement/repositories/statement.repository';

import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { User } from 'src/user/entity/user.entity';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(StatementRepository)
    private statementRepository: StatementRepository,
  ) {}

  async getStatementsOverViewAll(user: User) {
    const [statementsPerCategory, statementsWithInstallment] =
      await Promise.all([
        this.statementRepository.countAllFutureStatementsPerCategory(user),
        this.statementRepository.countAllFutureStatementsAndAmountIfHasInstallment(
          user,
        ),
      ]);

    return { statementsPerCategory, statementsWithInstallment };
  }

  async getStatementsOverviewMonthly(
    month: number,
    year: number,
    user: User,
    options: PaginatorOptionsDto,
  ) {
    const paginator = (await this.statementRepository.getStatementsPerMonth(
      month,
      year,
      user,
      options,
    )) as any;

    paginator.results.map((result) => delete result.userId);

    const [statementsPerCategory, statementsWithInstallment] =
      await Promise.all([
        this.statementRepository.countStatementsPerCategory(user, month, year),
        this.statementRepository.countStatementsAndAmountIfHasInstallment(
          user,
          month,
          year,
        ),
      ]);

    return {
      paginator,
      statementsPerCategory,
      statementsWithInstallment,
    };
  }
}
