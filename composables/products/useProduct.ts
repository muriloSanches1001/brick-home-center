import {useApiFetch} from "~/composables/api/useApiFetch";
import type {ProductResponse} from "~/types/api";

export const useProduct = (id: number | string) => {
  const productId = computed(() => Number(id))

  const { data, pending, error, refresh } = useAsyncData(
    () => 'product' + productId,
    () =>
      useApiFetch<ProductResponse>(`/produtos/${productId.value}`),
  )

  const product = computed(() => data.value)

  return {
    product,
    pending,
    error,
    refresh,
  }
}
