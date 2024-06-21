export interface PaginationRequest {
    pageNumber: number;
    pageSize: number;
    filter? : string;
  }
  
export interface PaginationResponse<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}
