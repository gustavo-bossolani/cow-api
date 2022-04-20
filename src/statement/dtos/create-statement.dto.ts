import { IsDefined } from 'class-validator';

class CreateStatementDto {
  @IsDefined()
  title: string;

  description?: string;

  @IsDefined()
  installment: number;

  @IsDefined()
  amount: number;
}

export { CreateStatementDto };
