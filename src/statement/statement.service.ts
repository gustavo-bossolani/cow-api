import { DefineError } from 'src/shared/models/define-error.model';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';

import { increaseMonth } from 'src/shared/util/increase-month-date';
import { StatementRepository } from './repositories/statement.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Statement } from './entities/statement.entity';

@Injectable()
export class StatementService {
  private statements: Statement[] = [];

  constructor(
    @InjectRepository(StatementRepository)
    private statementRepository: StatementRepository,
  ) {}

  async createStatement(
    createStatementDto: CreateStatementDto,
  ): Promise<Statement> {
    return this.statementRepository.createStatement(createStatementDto);
  }

  async getAllStatements(): Promise<Statement[]> {
    return await this.statementRepository.find();
  }

  async findStatemetById(id: string): Promise<Statement> {
    const statement = await this.statementRepository.findOne({ id });

    if (statement) {
      return statement;
    }

    throw new NotFoundException(new DefineError('Statement not found', 404));
  }

  async deleteStatementById(id: string): Promise<void> {
    const deleteStatement = await this.statementRepository.delete({ id });

    if (!deleteStatement.affected) {
      throw new NotFoundException(new DefineError('Statement not found', 404));
    }
  }

  async updateStatement(
    updateStatementDto: UpdateStatementDto,
    id: string,
  ): Promise<Statement> {
    const statement = await this.findStatemetById(id);

    const { installment } = updateStatementDto;

    Object.assign(statement, {
      ...updateStatementDto,
      finishDate: increaseMonth(installment),
    });

    await this.statementRepository.save(statement);

    return statement;
  }
}
