import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/repositories/category.repository';
import { StatementRepository } from 'src/statement/repositories/statement.repository';
import { User } from 'src/user/entity/user.entity';
import { MoreThan } from 'typeorm';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(StatementRepository)
    private statementRepository: StatementRepository,

    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getStatementsOverViewAll(user: User) {
    const response = await Promise.all([
      // get and count all categories off all statements
      this.statementRepository.countStatementsPerCategory(user),

      // get and count all statements with installment > 0 with toal amount
      this.statementRepository.countStatementsAndAmountIfHasInstallment(user),
    ]);

    const [totalStatementsPerCategory, totalStatementsWithInstallment] =
      response;

    return { totalStatementsPerCategory, totalStatementsWithInstallment };
  }
}
