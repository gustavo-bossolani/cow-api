class Paginator {
  static calculateOffset(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  protected getTotalPages(totalItens: number, perPage: number): number {
    return Math.ceil(totalItens / perPage);
  }

  protected hasNextPage(currentPage: number, totalPages: number): boolean {
    return currentPage < totalPages;
  }
}

export { Paginator };
