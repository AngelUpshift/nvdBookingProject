export interface IDeskGetDeskQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IDeskPaginationMetadata {
  totalDesks: number;
  totalPages: number;
  currentPage: number;
}
