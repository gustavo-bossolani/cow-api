import { IsDefined } from 'class-validator';

class CreateStatementDto {
  @IsDefined()
  title: string;

  @IsDefined()
  description: string;

  @IsDefined()
  installment: number;

  @IsDefined()
  amount: number;
}

export { CreateStatementDto };
