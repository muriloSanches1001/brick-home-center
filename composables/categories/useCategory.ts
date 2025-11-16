import { useApiFetch } from '~/composables/api/useApiFetch'
import type { ProductCategoryResponse } from '~/types/api'

export const useCategory = (id: number) => {
  const { data, pending, error, refresh } = useAsyncData(
    () => 'category' + id,
    () =>
      useApiFetch<ProductCategoryResponse>(`/categorias/${id}`),
  )

  const category = computed(() => data.value)

  return {
    category,
    pending,
    error,
    refresh,
  }
}
