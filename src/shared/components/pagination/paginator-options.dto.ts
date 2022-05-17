import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

class PaginatorOptionsDto {
  @ApiProperty({
    example: 2,
    nullable: false,
    required: true,
    description: 'Set the current page',
  })
  @IsDefined()
  page: number;

  @ApiProperty({
    example: 10,
    nullable: false,
    required: true,
    description: 'Limit of items per page',
  })
  @IsDefined()
  limit: number;
}

export { PaginatorOptionsDto };
