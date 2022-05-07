import { PaginatorOptionsDto } from './paginator-options.dto';
import { Paginator } from './paginator.model';

class Page<T> extends Paginator {
  limitPerPage: number;
  currentPage: number;
  totalPages: number;
  nextPage: boolean;
  totalItens: number;
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
