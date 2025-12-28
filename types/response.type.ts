interface PaginationInfo {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface Response<T> {
  data: T
  pagination?: PaginationInfo
}
