import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StatementRepository } from 'src/statement/repositories/statement.repository';

import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { User } from 'src/user/entity/user.entity';
import { Statement } from 'src/statement/entities/statement.entity';
import { OverviewAllDto } from './dto/overview-all.dto';
import { OverviewMonthlyDto } from './dto/overview-monthly.dto';

@Injectable()
export class OverviewService {
  private logger = new Logger('OverviewService');

  constructor(
    @InjectRepository(StatementRepository)
    private statementRepository: StatementRepository,
  ) {}

  async getStatementsOverviewAll(user: User): Promise<OverviewAllDto> {
    this.logger.log(`Retrieving overview data for username ${user.username}.`);

    const [statementsPerCategory, statementsWithInstallmentArr] =
      await Promise.all([
        this.statementRepository.countAllFutureStatementsPerCategory(user),
        this.statementRepository.countAllFutureStatementsAndAmountIfHasInstallmentPlan(
          user,
        ),
      ]);

    const [statementsWithInstallment] = statementsWithInstallmentArr;

    return { statementsPerCategory, statementsWithInstallment };
  }

  async getStatementsOverviewMonthly(
    month: number,
    year: number,
    user: User,
    options: PaginatorOptionsDto,
  ): Promise<OverviewMonthlyDto> {
    this.logger.log('Retrieving a month overview.');

    const paginator = await this.statementRepository.getStatementsPerMonth(
      month,
      year,
      user,
      options,
    );

    if (!paginator.results.length) {
      throw new HttpException(
        'No results for this month',
        HttpStatus.NO_CONTENT,
      );
    }

    paginator.results.map((statement) => {
      if (statement.installment > 1) {
        statement['installmentAmount'] = Number.parseFloat(
          (statement.amount / statement.installment).toFixed(2),
        );
      }
    });

    const [
      monthlyAmount,
      statementsPerCategory,
      statementsWithInstallmentPlan,
    ] = await Promise.all([
      this.statementRepository.countTotalMonthAmount(user, month, year),
      this.statementRepository.countMonthlyStatementsPerCategory(
        user,
        month,
        year,
      ),
      this.statementRepository.countTotalStatementsWithInstallmentPlanMonthly(
        user,
        month,
        year,
      ),
    ]);

    return {
      paginator,
      monthlyAmount,
      statementsPerCategory,
      statementsWithInstallmentPlan,
    };
  }
}
