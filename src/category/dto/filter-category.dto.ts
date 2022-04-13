import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class FilterCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}

export { FilterCategoryDto };
