import { $fetch, type FetchOptions } from 'ofetch'
import type { H3Event } from 'h3'

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
  catch (err: any) {
    console.error('Backend fetch error:', err?.data || err)

    throw createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.data.title || 'Erro interno do servidor',
      message: err.data.detail || 'Ocorreu um erro ao processar sua solicitação.',
    })
  }
}
