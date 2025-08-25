
export interface PageableResponseInterface<T> {
  elements: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

