import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useApiFetch} from '~/composables/api/useApiFetch'
import {useProduct} from "~/composables/products/useProduct";
import type {ErrorApiResponse, ProductResponse} from "~/types/api";

vi.mock('~/composables/api/useApiFetch', () => ({
    useApiFetch: vi.fn()
}))

describe('useProduct', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should fetch a product by id successfully', async () => {
        const mockApiFetch = vi.mocked(useApiFetch)

        mockApiFetch.mockResolvedValue(createMockProduct(1))

        const {product, pending, error, refresh} = useProduct(1)

        // await for the initial fetch
        await until(pending).toBe(false)

        expect(pending.value).toBe(false)
        expect(error.value).toBeUndefined()
        expect(product.value).toEqual(createMockProduct(1))
    })

    it('should expose error when apiFetch fails', async () => {
        const mockApiFetch = vi.mocked(useApiFetch)

        const fakeError: ErrorApiResponse = {
            type: 'https://example.com/probs/resource-not-found',
            title: 'Produto não encontrado.',
            status: 404,
            detail: 'O produto solicitado não foi encontrado no sistema.',
            instance: '/produtos/1'
        }

        mockApiFetch.mockRejectedValueOnce(fakeError)

        const {product, error, pending} = useProduct(1)

        // await for the fetch
        await until(pending).toBe(false)

        expect(product.value).toBeUndefined()
        expect(error.value).toMatchObject({
            cause: fakeError,
        })
    })

    it('should reuse cached data when called with the same id', async () => {
        const mockApiFetch = vi.mocked(useApiFetch)

        mockApiFetch
            .mockResolvedValueOnce(createMockProduct(1))
            .mockResolvedValueOnce(createMockProduct(1)) // This should not be called

        const {product: product1, pending: pending1} = useProduct(1)

        // await for the initial fetch
        await until(pending1).toBe(false)

        const {product: product2, pending: pending2} = useProduct(1)

        // await for the second fetch (should be instant due to cache)
        await until(pending2).toBe(false)

        expect(product1.value).toEqual(createMockProduct(1))
        expect(product2.value).toEqual(createMockProduct(1))
        expect(mockApiFetch).toHaveBeenCalledTimes(1)
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
    link: `/products/${id}`
})
