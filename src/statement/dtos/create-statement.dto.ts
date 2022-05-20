import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';

class CreateStatementDto {
  @ApiProperty({ example: 'Cellphone' })
  @IsDefined()
  title: string;

  @ApiProperty({ example: 'For work (Hypercard)', required: false })
  description?: string;

  @ApiProperty({
    example: 2,
    description: 'The quantity of installments if it has (can be 0)',
  })
  @IsDefined()
  installment: number;

  @ApiProperty({
    example: '2020-01-14',
    description: 'The date that you bought',
  })
  @IsDefined()
  startDate: string;

  @ApiProperty({ example: 500, description: 'The amount of purchase' })
  @IsDefined()
  amount: number;

  @ApiProperty({
    example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}

export { CreateStatementDto };
