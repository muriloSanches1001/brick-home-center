import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApiFetch } from '~/composables/api/useApiFetch'
import type { ErrorApiResponse, ProductCategoryResponse } from '~/types/api'
import { useCategories } from '~/composables/categories/useCategories'

vi.mock('~/composables/api/useApiFetch', () => ({
  useApiFetch: vi.fn(),
}))

describe('useCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch categories with pagination correctly', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch.mockResolvedValue({
      content: [
        createMockCategory(1),
        createMockCategory(2),
      ],
      pageNumber: 0,
      pageSize: 20,
      totalElements: 2,
      totalPages: 1,
    })

    const { query, categories, pagination, pending, error } = useCategories()

    // await for the initial fetch
    await until(pending).toBe(false)

    expect(query.value).toEqual({ page: 0, size: 20, sort: 'name', direction: 'ASC', search: '' })
    expect(pending.value).toBe(false)
    expect(error.value).toBeUndefined()
    expect(categories.value.length).toBe(2)
    expect(categories.value).toEqual([
      expect.objectContaining(createMockCategory(1)),
      expect.objectContaining(createMockCategory(2)),
    ])
    expect(pagination.value).toEqual({ page: 0, pageSize: 20, totalElements: 2, totalPages: 1 })
  })

  it('should merge initialQuery into default query', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch.mockResolvedValue({
      content: [],
      pageNumber: 1,
      pageSize: 20,
      totalElements: 0,
      totalPages: 0,
    })

    const { query, pending } = useCategories({ page: 1, search: 'test', size: 20 })

    // await for the initial fetch
    await until(pending).toBe(false)

    expect(query.value).toEqual({ page: 1, size: 20, sort: 'name', direction: 'ASC', search: 'test' })
    expect(mockApiFetch).toHaveBeenCalledWith('/categorias', {
      query: query.value,
    })
  })

  it('should refetch when query changes (pagination)', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch.mockResolvedValueOnce({
      content: [
        createMockCategory(1),
      ],
      pageNumber: 0,
      pageSize: 1,
      totalElements: 2,
      totalPages: 2,
    })

    mockApiFetch.mockResolvedValueOnce({
      content: [
        createMockCategory(2),
      ],
      pageNumber: 1,
      pageSize: 1,
      totalElements: 2,
      totalPages: 2,
    })

    const { query, categories, pagination, pending } = useCategories()

    // await for the initial fetch
    await until(pending).toBe(false)
    expect(categories.value.map(p => p.id)).toEqual([1])
    expect(pagination.value.page).toBe(0)

    // change the page
    query.value.page = 1

    // await for another fetch
    await until(pending).toBe(false)

    expect(mockApiFetch).toHaveBeenCalledTimes(2)
    expect(categories.value.map(p => p.id)).toEqual([2])
    expect(pagination.value.page).toBe(1)
  })

  it('should expose error when apiFetch fails', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    const fakeError: ErrorApiResponse = {
      type: 'https://example.com/probs/category-fetch',
      title: 'Falha ao buscar categorias.',
      status: 500,
      detail: 'Ocorreu um erro inesperado ao consultar a lista de categorias.',
      instance: '/categorias',
    }

    mockApiFetch.mockRejectedValueOnce(fakeError)

    const { categories, error, pending } = useCategories()

    // await for the fetch
    await until(pending).toBe(false)

    expect(categories.value.length).toBe(0)
    expect(error.value).toMatchObject({
      cause: fakeError,
    })
  })
})

const createMockCategory = (id: number): ProductCategoryResponse => ({
  id,
  name: `Category ${id}`,
  image: `https://cdn.example.com/img${id}.jpg`,
  createdAt: `2025-01-0${id}T00:00:00Z`,
  active: id % 2 === 0,
})
