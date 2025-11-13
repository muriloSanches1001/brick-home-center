// api response

export interface ApiResponse<T> {
  date: string
  message: string
  data: T
}

// pagination response

export interface PageResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
}

// page

export interface Page {
  page: number
  size: number
  sort: string
  direction: 'ASC' | 'DESC'
  search: string
}
