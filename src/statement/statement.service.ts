import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';

import { Statement } from './entities/statement.entity';

@Injectable()
export class StatementService {
  private statements: Statement[] = [];

  createStatement(createStatementDto: CreateStatementDto): Statement {
    const { description, finishDate, installment, title, amount } =
      createStatementDto;

    const statement: Statement = {
      description,
      finishDate,
      installment,
      title,
      amount,
      id: new Date().getMilliseconds().toString(),
      categoryId: new Date().getMilliseconds().toString(),
      userId: new Date().getMilliseconds().toString(),
    };

    this.statements.push(statement);
    return statement;
  }

  getAllStatements(): Statement[] {
    return this.statements;
  }

  findStatemetById(id: string): Statement {
    const statement = this.statements.find((statement) => statement.id === id);
    if (statement) {
      return statement;
    }
    throw new NotFoundException();
  }

  deleteStatemetnById(id: string): void {
    this.findStatemetById(id);
    this.statements = this.statements.filter(
      (statement) => statement.id !== id,
    );
  }

  updateStatement(
    updateStatementDto: UpdateStatementDto,
    id: string,
  ): Statement {
    const statement = this.findStatemetById(id);
    Object.assign(statement, { ...updateStatementDto });

    return statement;
  }
}
