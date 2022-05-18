import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

class UpdateStatementDto {
  @ApiProperty({ example: 'Cellphone', required: false })
  @IsString()
  title?: string;

  @ApiProperty({ example: 'For work (Hypercard)', required: false })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The quantity of installments if it has (can be 0)',
    example: 2,
    required: false,
  })
  @IsNumber()
  installment?: number;

  @ApiProperty({
    description: 'The amount of purchase',
    example: 500,
    required: false,
  })
  @IsNumber()
  amount?: number;

  @ApiProperty({
    example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e',
    description: 'Category id',
    required: false,
  })
  @IsString()
  @IsUUID()
  categoryId?: string;
}

export { UpdateStatementDto };
