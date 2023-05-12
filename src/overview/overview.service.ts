import { Injectable, Logger } from '@nestjs/common';
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

    const [statementsPerCategory, statementsWithInstallment] =
      await Promise.all([
        this.statementRepository.countAllStatementsPerCategory(user),
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
  ): Promise<OverviewMonthlyDto<Statement>> {
    this.logger.log('Retrieving a month overview.');

    const paginator = (await this.statementRepository.getStatementsPerMonth(
      month,
      year,
      user,
      options,
    )) as any;

    paginator.results.map((result) => {
      const typedResult: Statement = result;

      // create installment amount
      if (typedResult.installment) {
        result['installmentAmount'] =
          typedResult.amount / typedResult.installment;
      } else {
        result['installmentAmount'] = typedResult.amount;
      }

      // create category object
      const { name, color, categoryId } = result;

      if (result.categoryId) {
        result.category = {
          id: categoryId,
          name,
          color,
        };
      } else {
        result.category = null;
      }

      delete result.name;
      delete result.color;
      delete result.categoryId;
      delete result.installments;
      delete result.userId;
      return result;
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
