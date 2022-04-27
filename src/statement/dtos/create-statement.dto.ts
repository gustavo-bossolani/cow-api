import { IsDefined, IsOptional, IsUUID } from 'class-validator';

class CreateStatementDto {
  @IsDefined()
  title: string;

  description?: string;

  @IsDefined()
  installment: number;

  @IsDefined()
  amount: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}

export { CreateStatementDto };
