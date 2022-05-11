import { EntityRepository, Repository } from 'typeorm';

import { increaseMonth } from 'src/shared/util/increase-month-date';

import { CreateStatementDto } from '../dtos/create-statement.dto';

import { Statement } from '../entities/statement.entity';
import { User } from 'src/user/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';
import { CountStatementByCategory } from 'src/overview/models/count-statement-by-category.model';

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

  async countStatementsPerCategory(
    user: User,
  ): Promise<CountStatementByCategory[]> {
    const statementQuery = this.createQueryBuilder('statement')
      .select('COUNT(category.name) as total, category.name as category')
      .innerJoin('category', 'category', 'category.id = statement.categoryId')
      .where({ user })
      .groupBy('category.name');

    return await statementQuery.getRawMany();
  }

  async countStatementsAndAmountIfHasInstallment(user: User) {
    const statementQuery = await this.createQueryBuilder('statement')
      .select('COUNT(installment) as statements, SUM(amount) as amount')
      .where('statement.installment > 0')
      .andWhere({ user });

    return await statementQuery.getRawMany();
  }
}

export { StatementRepository };
