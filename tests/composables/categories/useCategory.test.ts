import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useApiFetch } from '~/composables/api/useApiFetch'
import type { ErrorApiResponse, ProductCategoryResponse } from '~/types/api'
import { useCategory } from '~/composables/categories/useCategory'

vi.mock('~/composables/api/useApiFetch', () => ({
  useApiFetch: vi.fn(),
}))

describe('useCategory', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch a category by id successfully', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch.mockResolvedValue(createMockCategory(1))

    const { category, pending, error } = useCategory(1)

    // await for the initial fetch
    await until(pending).toBe(false)

    expect(pending.value).toBe(false)
    expect(error.value).toBeUndefined()
    expect(category.value).toEqual(createMockCategory(1))
  })

  it('should expose error when apiFetch fails', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    const fakeError: ErrorApiResponse = {
      type: 'https://example.com/probs/resource-not-found',
      title: 'Categoria não encontrado.',
      status: 404,
      detail: 'A categoria solicitada não foi encontrada no sistema.',
      instance: '/categorias/1',
    }

    mockApiFetch.mockRejectedValueOnce(fakeError)

    const { category, error, pending } = useCategory(1)

    // await for the fetch
    await until(pending).toBe(false)

    expect(category.value).toBeUndefined()
    expect(error.value).toMatchObject({
      cause: fakeError,
    })
  })

  it('should reuse cached data when called with the same id', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch
      .mockResolvedValueOnce(createMockCategory(1))
      .mockResolvedValueOnce(createMockCategory(1)) // This should not be called

    const { category: category1, pending: pending1 } = useCategory(1)

    // await for the initial fetch
    await until(pending1).toBe(false)

    const { category: category2, pending: pending2 } = useCategory(1)

    // await for the second fetch (should be instant due to cache)
    await until(pending2).toBe(false)

    expect(category1.value).toEqual(createMockCategory(1))
    expect(category2.value).toEqual(createMockCategory(1))
    expect(mockApiFetch).toHaveBeenCalledTimes(1)
  })
})

const createMockCategory = (id: number): ProductCategoryResponse => ({
  id,
  name: `Category ${id}`,
  image: `https://cdn.example.com/img${id}.jpg`,
  createdAt: `2025-01-0${id}T00:00:00Z`,
  active: id % 2 === 0,
})
