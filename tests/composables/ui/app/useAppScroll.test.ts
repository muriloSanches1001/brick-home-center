import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAppScroll } from '~/composables/ui/app/useAppScroll'
import { useEventListener } from '@vueuse/core'

vi.mock('#app', () => ({
  useState: vi.fn((key, init) => {
    return { value: init() }
  }),
}))

vi.mock('@vueuse/core', () => ({
  useEventListener: vi.fn(),
}))

describe('useAppScroll', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should update isSticky state based on scroll position', () => {
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

  it('should register the scroll element and attach event listener', () => {
    const { registerScrollElement, updateScrollTop } = useAppScroll()

    const mockElement = document.createElement('div')

    registerScrollElement(mockElement)

    expect(useEventListener).toHaveBeenCalledWith(
      mockElement,
      'scroll',
      updateScrollTop,
    )
  })

  it('should scroll to top with smooth behavior by default', () => {
    const { registerScrollElement, scrollToTop } = useAppScroll()

    const mockElement = document.createElement('div')
    mockElement.scrollTo = vi.fn()

    registerScrollElement(mockElement)

    scrollToTop()

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('should scroll to top with auto behavior when smooth is false', () => {
    const { registerScrollElement, scrollToTop } = useAppScroll()

    const mockElement = document.createElement('div')
    mockElement.scrollTo = vi.fn()

    registerScrollElement(mockElement)

    scrollToTop(false)

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    })
  })

  it('should not throw error if scrollToTop is called without registered element', () => {
    const { scrollToTop } = useAppScroll()

    expect(() => scrollToTop()).not.toThrow()
  })
})
