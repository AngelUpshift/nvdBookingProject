export interface IRoomGetRoomQuery {
  search?: string;
  sortBy?: "createdAt" | "updatedAt";
  page?: number;
  order?: "asc" | "desc";
}

export interface IRoomPaginationMetadata {
  totalRooms: number;
  totalPages: number;
  currentPage: number;
}
