import { EntityRepository, Repository } from 'typeorm';

import { increaseMonth } from 'src/shared/util/increase-month-date';

import { CreateStatementDto } from '../dtos/create-statement.dto';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';
import { CountStatementByCategory } from 'src/overview/models/count-statement-by-category.model';
import { CountStatementWithInstallment } from 'src/overview/models/count-statement-with-installment.model';
import { CountStatementPerCategory } from 'src/overview/models/count-statement-per-category.model';

import { Statement } from '../entities/statement.entity';
import { User } from 'src/user/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';
import { Paginator } from 'src/shared/components/pagination/paginator.model';
import { Page } from 'src/shared/components/pagination/page.model';

@EntityRepository(Statement)
class StatementRepository extends Repository<Statement> {
  async createStatement(
    createStatementDto: CreateStatementDto,
    category: Category,
    user: User,
  ): Promise<Statement> {
    const { description, installment, title, amount } = createStatementDto;

    const statement = this.create({
      description,
      finishDate: increaseMonth(installment),
      installment,
      title,
      amount,
      user,
      category,
    });

    await this.save(statement);

    return statement;
  }

  async countAllFutureStatementsPerCategory(
    user: User,
  ): Promise<CountStatementPerCategory[]> {
    const statementQuery = this.createQueryBuilder('statement')
      .select(
        'CAST(COUNT(category.name) AS DOUBLE PRECISION) as total, category.name as category',
      )
      .innerJoin('category', 'category', 'category.id = statement.categoryId')
      .andWhere(
        `
        (((EXTRACT(YEARS FROM "statement"."finishDate"::date)::int - EXTRACT(YEARS FROM CURRENT_DATE::date)::int) * 12) -
        EXTRACT(MONTH FROM CURRENT_DATE:: date) + EXTRACT(MONTH FROM "statement"."finishDate":: date):: int) > 0
        `,
      )
      .andWhere({ user })
      .groupBy('category.name');

    return await statementQuery.getRawMany();
  }

  async countAllFutureStatementsAndAmountIfHasInstallment(
    user: User,
  ): Promise<CountStatementWithInstallment[]> {
    const statementQuery = await this.createQueryBuilder('statement')
      .select(
        'COUNT(installment)::INTEGER as statements, CAST(SUM(amount) AS DOUBLE PRECISION) as amount',
      )
      .where('statement.installment > 0')
      .andWhere(
        `
        (((EXTRACT(YEARS FROM "statement"."finishDate"::date)::int - EXTRACT(YEARS FROM CURRENT_DATE::date)::int) * 12) -
        EXTRACT(MONTH FROM CURRENT_DATE:: date) + EXTRACT(MONTH FROM "statement"."finishDate":: date):: int) > 0
        `,
      )
      .andWhere({ user });

    return await statementQuery.getRawMany();
  }

  async countStatementsPerCategory(
    user: User,
    month: number,
  ): Promise<CountStatementByCategory[]> {
    const statementQuery = this.createQueryBuilder('statement')
      .select(
        'COUNT(category.name)::INTEGER as total, category.name as category',
      )
      .innerJoin('category', 'category', 'category.id = statement.categoryId')
      .where({ user })
      .andWhere(
        `
        (((EXTRACT(YEARS FROM "statement"."finishDate"::date)::int - EXTRACT(YEARS FROM CURRENT_DATE::date)::int) * 12) -
        ${month} + EXTRACT(MONTH FROM "statement"."finishDate":: date):: int) >= 0
        `,
      )
      .groupBy('category.name');

    return await statementQuery.getRawMany();
  }

  async countStatementsAndAmountIfHasInstallment(
    user: User,
    month: number,
  ): Promise<CountStatementWithInstallment[]> {
    const statementQuery = await this.createQueryBuilder('statement')
      .select(
        'COUNT(installment)::INTEGER as statements, CAST(SUM(amount) AS DOUBLE PRECISION) as amount',
      )
      .where('statement.installment > 0')
      .andWhere(
        `
        (((EXTRACT(YEARS FROM "statement"."finishDate"::date)::int - EXTRACT(YEARS FROM CURRENT_DATE::date)::int) * 12) -
        ${month} + EXTRACT(MONTH FROM "statement"."finishDate":: date):: int) > 0
        `,
      )
      .andWhere({ user });

    let response = await statementQuery.getRawMany();

    if (response) {
      const { statements, amount } = response[0];
      if (!statements || !amount) {
        response = [];
      }
    }

    return response;
  }

  async getStatementsPerMonth(
    month: number,
    user: User,
    options: PaginatorOptionsDto,
  ): Promise<Page<Statement>> {
    const { limit, page } = options;

    const skip = Paginator.calculateOffset(page, limit);

    const statementQueryForTotal = await this.createQueryBuilder('statement')
      .select('COUNT()')
      .where(
        `
        (((EXTRACT(YEARS FROM "statement"."finishDate"::date)::int - EXTRACT(YEARS FROM CURRENT_DATE::date)::int) * 12) - 
        ${month} + EXTRACT(MONTH FROM "statement"."finishDate":: date):: int) >= 0`,
      )
      .andWhere({ user });

    const statementQueryForStatementsPerMonth = await this.createQueryBuilder(
      'statement',
    )
      .select(
        `
          *,
          (((EXTRACT(YEARS FROM "statement"."finishDate"::date)::int - EXTRACT(YEARS FROM CURRENT_DATE::date)::int) * 12) - 
          ${month} + EXTRACT(MONTH FROM "statement"."finishDate":: date):: int) AS "installments"
        `,
      )
      .where({ user })
      .andWhere(
        `
        (((EXTRACT(YEARS FROM "statement"."finishDate"::date)::int - EXTRACT(YEARS FROM CURRENT_DATE::date)::int) * 12) - 
        ${month} + EXTRACT(MONTH FROM "statement"."finishDate":: date):: int) >= 0 LIMIT ${limit} OFFSET ${skip}`,
      );

    const [total, results] = await Promise.all([
      statementQueryForTotal.getCount(),
      statementQueryForStatementsPerMonth.getRawMany<Statement>(),
    ]);

    return new Page({ options, results, total });
  }
}

export { StatementRepository };
