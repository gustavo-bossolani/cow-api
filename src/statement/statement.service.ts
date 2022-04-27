import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { DefineError } from 'src/shared/models/define-error.model';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';

import { increaseMonth } from 'src/shared/util/increase-month-date';
import { StatementRepository } from './repositories/statement.repository';

import { Statement } from './entities/statement.entity';
import { Category } from 'src/category/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(StatementRepository)
    private statementRepository: StatementRepository,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createStatement(createStatementDto: CreateStatementDto): Promise<void> {
    const { categoryId } = createStatementDto;

    const category: Category = await this.findCategory(categoryId);

    await this.statementRepository.createStatement(
      createStatementDto,
      category,
    );
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
  ): Promise<void> {
    const statement = await this.findStatemetById(id);

    const { installment, categoryId } = updateStatementDto;

    const category: Category = await this.findCategory(categoryId);

    Object.assign(statement, {
      ...updateStatementDto,
      finishDate: installment
        ? increaseMonth(installment)
        : statement.finishDate,
      category,
    });

    await this.statementRepository.save(statement);
  }

  private async findCategory(id: string) {
    let category: Category;
    if (id) {
      category = await this.categoryRepository.findOne({ id: id });

      if (!category) {
        throw new NotFoundException(
          new DefineError('Category not found.', 404),
        );
      }
    }
    return category;
  }
}
