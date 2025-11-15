import type { Page, PageResponse, ProductResponse } from '~/types/api'
import { useApiFetch } from '~/composables/api/useApiFetch'

export const useProducts = (
  initialQuery: Partial<Page> = {},
) => {
  const query = ref<Page>({
    page: 0,
    size: 20,
    sort: 'name',
    direction: 'ASC',
    search: '',
    ...initialQuery,
  })

  const { data, pending, error, refresh } = useAsyncData(
    () => 'products' + JSON.stringify(query.value),
    () =>
      useApiFetch<PageResponse<ProductResponse>>('/produtos', {
        query: query.value,
      }),
    {
      watch: [query],
    },
  )

  const products = computed(() => data.value?.content ?? [])

  const pagination = computed(() => ({
    page: data.value?.pageNumber ?? query.value.page ?? 0,
    pageSize: data.value?.pageSize ?? query.value.size ?? 0,
    totalElements: data.value?.totalElements ?? 0,
    totalPages: data.value?.totalPages ?? 0,
  }))

  return {
    query,

    products,
    pagination,
    pending,
    error,
    refresh,
  }
}
