import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StatementRepository } from 'src/statement/repositories/statement.repository';

import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { User } from 'src/user/entity/user.entity';
import { Statement } from 'src/statement/entities/statement.entity';
import { OverviewAllDto } from './dto/overview-all.dto';
import { OverviewMonthlyDto } from './dto/overview-monthly.dto';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(StatementRepository)
    private statementRepository: StatementRepository,
  ) {}

  async getStatementsOverviewAll(user: User): Promise<OverviewAllDto> {
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
  ): Promise<OverviewMonthlyDto<Statement>> {
    const paginator = (await this.statementRepository.getStatementsPerMonth(
      month,
      year,
      user,
      options,
    )) as any;

    paginator.results.map((result) => {
      // create installment amount
      if (result.installment > 0) {
        result['installmentAmount'] = result.amount / result.installment;
      } else {
        result['installmentAmount'] = result.amount;
      }

      result['remainingInstallments'] = result['installments'];

      // create category object
      const { name, color, categoryId } = result;
      result.category = {
        id: categoryId,
        name,
        color,
      };

      delete result.name;
      delete result.color;
      delete result.categoryId;
      delete result.installments;
      delete result.userId;
      return result;
    });

    const [monthlyAmount, statementsPerCategory, statementsWithInstallment] =
      await Promise.all([
        this.statementRepository.countTotalMonthAmount(user, month, year),
        this.statementRepository.countStatementsPerCategory(user, month, year),
        this.statementRepository.countStatementsAndAmountIfHasInstallment(
          user,
          month,
          year,
        ),
      ]);

    return {
      monthlyAmount,
      paginator,
      statementsPerCategory,
      statementsWithInstallment,
    };
  }
}
