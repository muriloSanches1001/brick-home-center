import { useApiFetch } from '~/composables/api/useApiFetch'
import type { ProductResponse } from '~/types/api'

export const useProduct = (id: number) => {
  const { data, pending, error, refresh } = useAsyncData(
    () => 'product' + id,
    () =>
      useApiFetch<ProductResponse>(`/produtos/${id}`),
  )

  const product = computed(() => data.value)

  return {
    product,
    pending,
    error,
    refresh,
  }
}
