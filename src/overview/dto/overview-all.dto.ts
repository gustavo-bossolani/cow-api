import { ApiProperty } from '@nestjs/swagger';

class OverviewAllDto {
  @ApiProperty({
    example: [
      { total: 1, category: 'Hardware' },
      { total: 1, category: 'Services' },
    ],
  })
  statementsPerCategory: StatementPerCategory[];

  @ApiProperty({ example: [{ statements: 2, amount: 2000 }] })
  statementsWithInstallment: StatementWithInstallment;
}

interface StatementPerCategory {
  total: number;
  category: string;
}

interface StatementWithInstallment {
  statements: number;
  amount: number;
}

export { OverviewAllDto };
