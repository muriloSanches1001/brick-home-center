import { describe, expect, it, vi } from 'vitest'
import { useSearchArea } from '~/composables/ui/modals/useSearchArea'

describe('useSearchArea', () => {
  it('should open, close and toggle the state', async () => {
    const state = { value: false }

    // Mock the useState composable
    vi.mock('#app', () => ({
      useState: vi.fn(() => state),
    }))

    const { isOpen, open, close, toggle } = useSearchArea()

    expect(isOpen.value).toBe(false)

    open()
    expect(isOpen.value).toBe(true)

    close()
    expect(isOpen.value).toBe(false)

    toggle()
    expect(isOpen.value).toBe(true)

    toggle()
    expect(isOpen.value).toBe(false)
  })
})
