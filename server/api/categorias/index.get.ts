import type { H3Event } from 'h3'
import type { ApiResponse, Page, PageResponse, ProductCategoryResponse } from '~/types/api'
import { backendFetch } from '~/server/utils/backend-client'

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery<Page>(event)

  const response = await backendFetch<ApiResponse<PageResponse<ProductCategoryResponse>>>(
    event,
    '/module/product/product-category/v1',
    { query },
  )

  return response.data
})
