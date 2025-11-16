import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useApiFetch } from '~/composables/api/useApiFetch'
import { useVisitAnalytics } from '~/composables/analytics/useVisitAnalytics'
import type { ErrorApiResponse } from '~/types/api'

vi.mock('~/composables/api/useApiFetch', () => ({
  useApiFetch: vi.fn(),
}))

describe('useVisitAnalytics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should send visit successfully and reset loading state', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    mockApiFetch.mockResolvedValue({ success: true })

    const { sendVisit } = useVisitAnalytics()

    const res = await sendVisit()

    expect(mockApiFetch).toHaveBeenCalledWith(
      '/analises/visitar',
      { method: 'POST' },
    )
    expect(res).toBeUndefined()
  })

  it('should expose error when apiFetch fails', async () => {
    const mockApiFetch = vi.mocked(useApiFetch)

    const fakeError: ErrorApiResponse = {
      type: 'https://example.com/probs/visit-analytics',
      title: 'Falha ao registrar visita.',
      status: 500,
      detail: 'Ocorreu um erro inesperado ao tentar registrar a visita.',
      instance: '/analises/visitar',
    }

    mockApiFetch.mockRejectedValueOnce(fakeError)

    const { sendVisit, error, isSending } = useVisitAnalytics()
    await sendVisit()

    expect(error.value).toMatchObject({
      cause: fakeError,
    })
    expect(isSending.value).toBe(false)
  })
})
