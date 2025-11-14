import type { FetchOptions } from 'ofetch'

export const useApiFetch = <T>(
  path: string,
  options: FetchOptions<'json'> = {}
) => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$apiFetch<T>(path, options) as Promise<T>
}
