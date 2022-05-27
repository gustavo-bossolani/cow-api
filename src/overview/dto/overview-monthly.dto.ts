import { ApiProperty } from '@nestjs/swagger';

import { CountStatementByCategory } from '../models/count-statement-by-category.model';
import { CountStatementWithInstallment } from '../models/count-statement-with-installment.model';

import { Page } from 'src/shared/components/pagination/page.model';

class OverviewMonthlyDto<T> {
  @ApiProperty()
  monthlyAmount: number;

  @ApiProperty()
  paginator: Page<T>;

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
  statementsWithInstallment: CountStatementWithInstallment[];
}

export { OverviewMonthlyDto };
