export interface IUserGetUserQuery {
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "first_name" | "team" | "last_name";
  page?: number;
  order?: "asc" | "desc";
}

export interface IUserPaginationMetadata {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}
