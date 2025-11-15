import type { H3Event } from 'h3'
import { backendFetch } from '~/server/utils/backend-client'

export default defineEventHandler(async (event: H3Event) => {
  await backendFetch(
    event,
    '/module/analytics/visitor-access-analytics/v1/visit',
    {
      method: 'POST',
    },
  )

  return { success: true }
})
