import { $fetch, FetchError, type FetchOptions } from 'ofetch'
import type { H3Event } from 'h3'
import type { ErrorApiResponse } from '~/types/api'

export const backendFetch = async <T>(event: H3Event, path: string, options: FetchOptions<'json'> = {}): Promise<T> => {
  const config = useRuntimeConfig(event)

  try {
    return await $fetch<T>(path, {
      baseURL: config.backendBase,
      headers: {
        Authorization: 'Bearer ' + config.privateApiKey,
        ...(options.headers || {}),
      },
      ...options,
    })
  }
  catch (err: unknown) {
    console.error('Backend fetch error:', err)

    if (isFetchError(err) && isErrorApiResponse(err.data)) {
      const data: ErrorApiResponse = err.data
      throw createError({
        statusCode: data.status,
        statusMessage: data.title || 'Erro na API',
        message: data.detail || 'Ocorreu um erro ao processar sua solicitação.',
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
      message: 'Ocorreu um erro ao processar sua solicitação.',
    })
  }
}

const isErrorApiResponse = (payload: unknown): payload is ErrorApiResponse => {
  if (typeof payload !== 'object' || payload === null) return false

  const obj = payload as Partial<ErrorApiResponse>

  if (typeof obj.type !== 'string') return false
  if (typeof obj.status !== 'number') return false

  if (obj.title !== undefined && typeof obj.title !== 'string') return false
  if (obj.detail !== undefined && typeof obj.detail !== 'string') return false
  if (obj.instance !== undefined && typeof obj.instance !== 'string') return false

  return true
}

const isFetchError = (payload: unknown): payload is FetchError => payload instanceof FetchError
