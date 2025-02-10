export interface IBookingGetBookingQuery {
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "status" | "date";
  order?: "asc" | "desc";
  page?: number;
}

export interface IBookingPaginationMetadata {
  totalBookings: number;
  totalPages: number;
  currentPage: number;
}
