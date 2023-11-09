export class Page {
  pageSize = 25;
  pageSizeNotify = 50;
  pageSizeAll = 9999999;
  pageNumberFirst = 1;
  // The total number of elements
  totalItems = 0;
  // The total number of pages
  totalPages = 0;
  // The current page number
  pageNumber = 0;
  isActive: boolean | string;

  perPageOptions: Array<number> = [25, 50, 100, 200];

  getPageNumber() {
    return this.pageNumber + 1;
  }

  public readonly MAX_PAGE_SIZE = 1000;
  public readonly OFFSET_DEFAULT = 1;
}
