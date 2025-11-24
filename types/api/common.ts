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
  categoryId?: string | number
}

// error api

export interface ErrorApiResponse {
  type: string
  title?: string
  status: number
  detail?: string
  instance?: string
}
