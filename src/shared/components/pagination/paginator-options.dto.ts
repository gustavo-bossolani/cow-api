import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

class PaginatorOptionsDto {
  @ApiProperty({
    example: 2,
    nullable: false,
    required: true,
    description: 'Set the current page',
  })
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({
    example: 10,
    nullable: false,
    required: true,
    description: 'Limit of items per page',
  })
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  limit: number;
}

export { PaginatorOptionsDto };
