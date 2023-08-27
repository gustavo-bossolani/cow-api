import { ApiProperty } from '@nestjs/swagger';

import { CountStatementByCategory } from '../models/count-statement-by-category.model';
import { CountStatementWithInstallment } from '../models/count-statement-with-installment.model';

import { Page } from 'src/shared/components/pagination/page.model';

import { Category } from 'src/category/entity/category.entity';

interface StatementInfoDto {
  id: string;
  title: string;
  description: string;
  installment: number;
  finishDate: string;
  startDate: string;
  amount: number;
  installmentAmount?: number;
  category?: Category | null;
}

class OverviewMonthlyDto {
  @ApiProperty()
  monthlyAmount: number;

  @ApiProperty()
  paginator: Page<StatementInfoDto>;

  @ApiProperty({
    example: [
      { total: 1, category: 'Serviços de Stream' },
      { total: 1, category: 'Services' },
    ],
  })
  statementsPerCategory: CountStatementByCategory[];

  @ApiProperty({
    example: [{ statements: 2, amount: 2000 }],
  })
  statementsWithInstallmentPlan: CountStatementWithInstallment[];
}

export { OverviewMonthlyDto, StatementInfoDto };
