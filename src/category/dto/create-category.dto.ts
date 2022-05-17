import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

class CreateCategoryDto {
  @ApiProperty({ example: 'Hardware' })
  @IsDefined()
  name: string;

  @ApiProperty({
    example: '#FFFF',
    required: false,
    description: 'Color to show on frontend',
  })
  color?: string;
}

export { CreateCategoryDto };
