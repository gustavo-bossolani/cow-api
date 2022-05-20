import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

class UpdateStatementDto {
  @ApiProperty({ example: 'Cellphone', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'For work (Hypercard)', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The quantity of installments if it has (can be 0)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  installment?: number;

  @ApiProperty({
    example: '2020-01-14',
    description: 'The date that you bought',
  })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({
    description: 'The amount of purchase',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e',
    description: 'Category id',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  categoryId?: string;
}

export { UpdateStatementDto };
