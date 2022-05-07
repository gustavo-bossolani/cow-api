import { IsDefined } from 'class-validator';

class PaginatorOptionsDto {
  @IsDefined()
  page: number;

  @IsDefined()
  limit: number;
}

export { PaginatorOptionsDto };
