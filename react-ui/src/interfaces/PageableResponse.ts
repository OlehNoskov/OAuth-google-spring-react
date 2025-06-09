
export interface PageableResponse<T> {
  elements: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

