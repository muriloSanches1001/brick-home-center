import { describe, expect, it, vi } from 'vitest'
import { useAppScroll } from '~/composables/ui/app/useAppScroll'

describe('useAppScroll', () => {
  it('should update isSticky state based on scroll position', async () => {
    vi.mock('#app', () => ({
      useState: vi.fn((key, init) => {
        return { value: init() }
      }),
    }))

    const { updateScrollTop, isSticky } = useAppScroll()

    expect(isSticky.value).toBe(false)

    const eventScrollDown = {
      target: { scrollTop: 100 },
    } as unknown as Event

    updateScrollTop(eventScrollDown)

    expect(isSticky.value).toBe(true)

    const eventScrollUp = {
      target: { scrollTop: 0 },
    } as unknown as Event

    updateScrollTop(eventScrollUp)

    expect(isSticky.value).toBe(false)
  })
})
