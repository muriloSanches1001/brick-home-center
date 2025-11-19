import { describe, expect, it, vi } from 'vitest'
import { useSidebar } from '~/composables/ui/modals/useSidebar'

describe('useSidebar', () => {
  it('should open, close and toggle the state', async () => {
    const state = { value: false }

    // Mock the useState composable
    vi.mock('#app', () => ({
      useState: vi.fn(() => state),
    }))

    const { isOpen, open, close, toggle } = useSidebar()

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
