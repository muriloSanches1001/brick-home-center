import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useProducts } from '~/composables/products/useProducts'
import { useApiFetch } from '~/composables/api/useApiFetch'
import type { ErrorApiResponse, ProductResponse } from '~/types/api'

vi.mock('~/composables/api/useApiFetch', () => ({
  useApiFetch: vi.fn(),
}))

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch products with pagination correctly', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch.mockResolvedValue({
      content: [
        createMockProduct(1),
        createMockProduct(2),
      ],
      pageNumber: 0,
      pageSize: 20,
      totalElements: 2,
      totalPages: 1,
    })

    const { query, products, pagination, pending, error } = useProducts()

    // await for the initial fetch
    await until(pending).toBe(false)

    expect(query.value).toEqual({ page: 0, size: 20, sort: 'name', direction: 'ASC', search: '' })
    expect(pending.value).toBe(false)
    expect(error.value).toBeUndefined()
    expect(products.value.length).toBe(2)
    expect(products.value).toEqual([
      expect.objectContaining(createMockProduct(1)),
      expect.objectContaining(createMockProduct(2)),
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

    const { query, pending } = useProducts({ page: 1, search: 'test', size: 20 })

    // await for the initial fetch
    await until(pending).toBe(false)

    expect(query.value).toEqual({ page: 1, size: 20, sort: 'name', direction: 'ASC', search: 'test' })
    expect(mockApiFetch).toHaveBeenCalledWith('/produtos', {
      query: query.value,
    })
  })

  it('should refetch when query changes (pagination)', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch.mockResolvedValueOnce({
      content: [
        createMockProduct(1),
      ],
      pageNumber: 0,
      pageSize: 1,
      totalElements: 2,
      totalPages: 2,
    })

    mockApiFetch.mockResolvedValueOnce({
      content: [
        createMockProduct(2),
      ],
      pageNumber: 1,
      pageSize: 1,
      totalElements: 2,
      totalPages: 2,
    })

    const { query, products, pagination, pending } = useProducts()

    // await for the initial fetch
    await until(pending).toBe(false)
    expect(products.value.map(p => p.id)).toEqual([1])
    expect(pagination.value.page).toBe(0)

    // change the page
    query.value.page = 1

    // await for another fetch
    await until(pending).toBe(false)

    expect(mockApiFetch).toHaveBeenCalledTimes(2)
    expect(products.value.map(p => p.id)).toEqual([2])
    expect(pagination.value.page).toBe(1)
  })

  it('should expose error when apiFetch fails', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    const fakeError: ErrorApiResponse = {
      type: 'https://example.com/probs/product-fetch',
      title: 'Falha ao buscar produtos.',
      status: 500,
      detail: 'Ocorreu um erro inesperado ao consultar a lista de produtos.',
      instance: '/produtos',
    }

    mockApiFetch.mockRejectedValueOnce(fakeError)

    const { products, error, pending } = useProducts()

    // await for the fetch
    await until(pending).toBe(false)

    expect(products.value.length).toBe(0)
    expect(error.value).toMatchObject({
      cause: fakeError,
    })
  })
})

const createMockProduct = (id: number): ProductResponse => ({
  id,
  name: `Product ${id}`,
  price: id * 10,
  description: `Desc ${id}`,
  images: [`https://cdn.example.com/img${id}.jpg`],
  createdAt: `2025-01-0${id}T00:00:00Z`,
  categories: [],
  active: id % 2 === 0,
  link: `/products/${id}`,
})
