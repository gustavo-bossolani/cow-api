import { IsDefined } from 'class-validator';

class CreateCategoryDto {
  @IsDefined()
  name: string;

  color?: string;
}

export { CreateCategoryDto };
