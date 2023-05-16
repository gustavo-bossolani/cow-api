import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { increaseMonth } from 'src/shared/util/increase-month-date';

import { CreateStatementDto } from '../dtos/create-statement.dto';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';
import { UpdateStatementDto } from '../dtos/update-statement.dto';
import { CountStatementByCategory } from 'src/overview/models/count-statement-by-category.model';
import { CountStatementWithInstallment } from 'src/overview/models/count-statement-with-installment.model';
import { CountStatementPerCategory } from 'src/overview/models/count-statement-per-category.model';

import { Statement } from '../entities/statement.entity';
import { User } from 'src/user/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';
import { Paginator } from 'src/shared/components/pagination/paginator.model';
import { Page } from 'src/shared/components/pagination/page.model';
import {
  countAllStatementsPerCategory,
  countAllFutureStatementsAndAmountIfHasInstallmentPlan,
  countMonthlyStatementsPerCategory,
  countTotalMonthAmount,
  countTotalStatementsWithInstallmentPlanMonthly,
  getStatementsPerMonth,
} from '../queries';
import { PostgresErrorCode } from 'src/shared/models/postgres-error-code.enum';

@EntityRepository(Statement)
class StatementRepository extends Repository<Statement> {
  private logger = new Logger('StatementService');

  async createStatement(
    createStatementDto: CreateStatementDto,
    category: Category,
    user: User,
  ): Promise<Statement> {
    const { description, installment, startDate, title, amount } =
      createStatementDto;

    const statement = this.create({
      description,
      finishDate: increaseMonth(startDate, installment),
      installment,
      startDate,
      title,
      amount,
      user,
      category,
    });

    try {
      await this.save(statement);
      this.logger.log('Statement created.');
      return statement;
    } catch (error) {
      if (error.code === PostgresErrorCode.CheckViolation) {
        throw new HttpException(
          'Installment has to be greater than one',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

  async updateStatement(
    updateStatementDto: UpdateStatementDto,
    statement: Statement,
    category: Category,
  ): Promise<void> {
    this.logger.log('Verifying statement data.');

    const { installment, startDate } = updateStatementDto;
    const { installment: dbInstallment, startDate: dbStartDate } = statement;

    Object.assign(statement, { ...updateStatementDto, category });

    if (installment && startDate) {
      Object.assign(statement, {
        ...statement,
        finishDate: increaseMonth(startDate, installment),
        startDate,
        installment,
      });
    }

    if (installment && !startDate) {
      Object.assign(statement, {
        ...statement,
        finishDate: increaseMonth(dbStartDate, installment),
        installment,
      });
    }

    if (!installment && startDate) {
      Object.assign(statement, {
        ...statement,
        finishDate: increaseMonth(startDate, dbInstallment),
        startDate,
      });
    }

    await this.save(statement);
    this.logger.log('Statement updated.');
  }

  async countAllStatementsPerCategory(
    user: User,
  ): Promise<CountStatementPerCategory[]> {
    this.logger.log(
      `Counting all future statements per category for user ${user.username}.`,
    );

    return await this.query(countAllStatementsPerCategory(user.id));
  }

  async countAllFutureStatementsAndAmountIfHasInstallmentPlan(
    user: User,
  ): Promise<CountStatementWithInstallment[]> {
    this.logger.log(
      `Counting all future statements and amount if statement has installment for user ${user.username}.`,
    );

    return await this.query(
      countAllFutureStatementsAndAmountIfHasInstallmentPlan(user.id),
    );
  }

  async countMonthlyStatementsPerCategory(
    user: User,
    month: number,
    year: number,
  ): Promise<CountStatementByCategory[]> {
    this.logger.log(
      `Counting statements per category with month ${month} and year ${year}.`,
    );

    return await this.query(
      countMonthlyStatementsPerCategory(user.id, year, month),
    );
  }

  async countTotalStatementsWithInstallmentPlanMonthly(
    user: User,
    month: number,
    year: number,
  ): Promise<CountStatementWithInstallment[]> {
    this.logger.log(
      `Counting statements and amount if the statement has installment with month ${month} and year ${year}.`,
    );

    return await this.query(
      countTotalStatementsWithInstallmentPlanMonthly(user.id, year, month),
    );
  }

  async getStatementsPerMonth(
    month: number,
    year: number,
    user: User,
    options: PaginatorOptionsDto,
  ): Promise<Page<Statement>> {
    this.logger.log(
      `Separating statements and total for month ${month} and year ${year}.`,
    );

    const { limit, page } = options;
    const skip = Paginator.calculateOffset(page, limit);

    const statementQueryForTotal = this.createQueryBuilder('statement')
      .select('COUNT(*)')
      .where('statement.startDate - :startDate <= 0', {
        startDate: `${year}-${month}-01`,
      })
      .andWhere('statement.finishDate - :finishDate >= 0', {
        finishDate: `${year}-${month}-01`,
      })
      .andWhere({ user });

    const [total, results] = await Promise.all([
      statementQueryForTotal.getCount(),
      this.query(getStatementsPerMonth(user.id, year, month, limit, skip)),
    ]);

    return new Page({ options, results, total });
  }

  async countTotalMonthAmount(
    user: User,
    month: number,
    year: number,
  ): Promise<number> {
    this.logger.log(
      `Counting total amount for month ${month} and year ${year}.`,
    );

    const [{ amount }] = await this.query(
      countTotalMonthAmount(user.id, year, month),
    );

    return amount as number;
  }
}

export { StatementRepository };
