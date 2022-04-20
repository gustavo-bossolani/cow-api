import { EntityRepository, Repository } from 'typeorm';

import { increaseMonth } from 'src/shared/util/increase-month-date';

import { CreateStatementDto } from '../dtos/create-statement.dto';

import { Category } from 'src/category/entity/category.entity';
import { Statement } from '../entities/statement.entity';
import { User } from 'src/user/entity/user.entity';

@EntityRepository(Statement)
class StatementRepository extends Repository<Statement> {
  async createStatement(
    createStatementDto: CreateStatementDto,
  ): Promise<Statement> {
    const { description, installment, title, amount } = createStatementDto;

    const statement = this.create({
      description,
      finishDate: increaseMonth(installment),
      installment,
      title,
      amount,
      user: new User(),
      category: new Category(),
    });

    await this.save(statement);

    return statement;
  }
}

export { StatementRepository };
