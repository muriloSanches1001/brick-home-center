import type { Page, PageResponse, ProductCategoryResponse } from '~/types/api'
import { useApiFetch } from '~/composables/api/useApiFetch'

export const useCategories = (
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
    () => 'categories' + JSON.stringify(query.value),
    () =>
      useApiFetch<PageResponse<ProductCategoryResponse>>('/categorias', {
        query: query.value,
      }),
    {
      watch: [query],
    },
  )

  const categories = computed(() => data.value?.content ?? [])

  const pagination = computed(() => ({
    page: data.value?.pageNumber ?? query.value.page ?? 0,
    pageSize: data.value?.pageSize ?? query.value.size ?? 0,
    totalElements: data.value?.totalElements ?? 0,
    totalPages: data.value?.totalPages ?? 0,
  }))

  return {
    query,

    categories,
    pagination,
    pending,
    error,
    refresh,
  }
}
