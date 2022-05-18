import { ApiProperty } from '@nestjs/swagger';

import { PaginatorOptionsDto } from './paginator-options.dto';

import { Paginator } from './paginator.model';

class Page<T> extends Paginator {
  @ApiProperty({
    example: 10,
  })
  limitPerPage: number;

  @ApiProperty({
    example: 2,
  })
  currentPage: number;

  @ApiProperty({
    example: 3,
  })
  totalPages: number;

  @ApiProperty({
    example: true,
    description: 'Sets if pagination has next page',
  })
  nextPage: boolean;

  @ApiProperty({
    example: 22,
  })
  totalItens: number;

  @ApiProperty({
    example: ['item 1', 'item 2', 'item 3'],
    description: 'Array with found results',
  })
  results: T[];

  constructor(pageData: PageData<T>) {
    super();

    const { options, results, total } = pageData;
    const { limit, page } = options;

    const totalPages = super.getTotalPages(total, limit);
    const hasNextPage = super.hasNextPage(page, totalPages);

    this.limitPerPage = limit;
    this.currentPage = page;
    this.nextPage = hasNextPage;
    this.totalPages = totalPages;
    this.totalItens = total;
    this.results = results;
  }
}

interface PageData<T> {
  options: PaginatorOptionsDto;
  results: T[];
  total: number;
}

export { Page };
