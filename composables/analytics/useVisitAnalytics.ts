import { useApiFetch } from '~/composables/api/useApiFetch'
import { FetchError } from 'ofetch'

export const useVisitAnalytics = () => {
  const isSending = ref(false)
  const error = ref<unknown | null>(null)

  const sendVisit = async () => {
    try {
      isSending.value = true
      error.value = null

      await useApiFetch<{ success: boolean }>(
        '/analises/visitar',
        { method: 'POST' },
      )
    }
    catch (err) {
      error.value = new FetchError('Failed to send visit analytics', { cause: err })
    }
    finally {
      isSending.value = false
    }
  }

  return {
    sendVisit,
    isSending,
    error,
  }
}
