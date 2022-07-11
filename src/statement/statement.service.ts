import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DefineError } from 'src/shared/models/define-error.model';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { StatementRepository } from './repositories/statement.repository';

import { User } from 'src/user/entity/user.entity';
import { Statement } from './entities/statement.entity';
import { Category } from 'src/category/entity/category.entity';
import { Page } from 'src/shared/components/pagination/page.model';
import { Paginator } from 'src/shared/components/pagination/paginator.model';

@Injectable()
export class StatementService {
  private logger = new Logger('StatementService');

  constructor(
    @InjectRepository(StatementRepository)
    private statementRepository: StatementRepository,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createStatement(
    createStatementDto: CreateStatementDto,
    user: User,
  ): Promise<void> {
    const { categoryId } = createStatementDto;

    const category: Category = await this.findCategory(categoryId);

    await this.statementRepository.createStatement(
      createStatementDto,
      category,
      user,
    );
  }

  async getAllStatements(
    user: User,
    options: PaginatorOptionsDto,
  ): Promise<Page<Statement>> {
    this.logger.log('Finding statements.');

    const { limit, page } = options;

    const [results, total] = await this.statementRepository.findAndCount({
      take: limit,
      skip: Paginator.calculateOffset(page, limit),
      where: { user },
    });

    return new Page({ options, results, total });
  }

  async findStatemetById(id: string, user: User): Promise<Statement> {
    this.logger.log(`Finding statement with id ${id}.`);

    const statement = await this.statementRepository.findOne({ id, user });

    if (statement) {
      return statement;
    }

    this.logger.error('Statement not found.');
    throw new NotFoundException(new DefineError('Statement not found.', 404));
  }

  async deleteStatementById(id: string, user: User): Promise<void> {
    this.logger.log(`Finding statement with id ${id}..`);

    const deleteStatement = await this.statementRepository.delete({ id, user });

    this.logger.log('Statement deleted.');

    if (!deleteStatement.affected) {
      this.logger.error('Statement not found.');
      throw new NotFoundException(new DefineError('Statement not found.', 404));
    }
  }

  async updateStatement(
    updateStatementDto: UpdateStatementDto,
    id: string,
    user: User,
  ): Promise<void> {
    const { categoryId } = updateStatementDto;

    const statement = await this.findStatemetById(id, user);
    const category: Category = await this.findCategory(categoryId);

    return this.statementRepository.updateStatement(
      updateStatementDto,
      statement,
      category,
    );
  }

  private async findCategory(id: string) {
    this.logger.log(`Finding category with id ${id}..`);

    let category: Category;
    if (id) {
      category = await this.categoryRepository.findOne({ id });

      if (!category) {
        this.logger.error('Category not found.');

        throw new NotFoundException(
          new DefineError('Category not found.', 404),
        );
      }
    }
    return category;
  }
}
