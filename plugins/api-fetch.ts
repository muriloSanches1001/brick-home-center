import { $fetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: import.meta.server
      ? config.backendBase
      : '/api',
  })
  return {
    provide: {
      apiFetch,
    },
  }
})
