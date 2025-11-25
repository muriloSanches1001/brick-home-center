import type { H3Event } from 'h3'
import { backendFetch } from '~/server/utils/backend-client'
import type { ApiResponse, ProductResponse } from '~/types/api'

export default defineEventHandler(async (event: H3Event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID do produto é obrigatório',
    })
  }

  const productId = Number(id)

  const response = await backendFetch<ApiResponse<ProductResponse>>(
    event,
    `/module/product/product/v1/${productId}`,
  )

  return response.data
})
