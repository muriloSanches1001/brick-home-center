import {useApiFetch} from "~/composables/api/useApiFetch";
import type {ProductCategoryResponse} from "~/types/api";

export const useCategory = (id: number | string) => {
  const categoryId = computed(() => Number(id))

  const { data, pending, error, refresh } = useAsyncData(
    () => 'category' + categoryId,
    () =>
      useApiFetch<ProductCategoryResponse>(`/categorias/${categoryId.value}`),
  )

  const category = computed(() => data.value)

  return {
    category,
    pending,
    error,
    refresh,
  }
}
