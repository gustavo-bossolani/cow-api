import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class FilterCategoryDto {
  @ApiProperty({
    example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e',
    nullable: false,
    required: false,
    description: 'Id to filter category',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @ApiProperty({
    example: 'Hardware',
    nullable: true,
    required: false,
    description: 'Name to filter category',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}

export { FilterCategoryDto };
