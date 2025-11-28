import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useAppAccessibility} from "~/composables/ui/app/useAppAccessibility";

vi.mock('#app', () => ({
  useCookie: vi.fn((key, opts) => {
    const initialValue = opts.default ? opts.default() : 100
    return ref(initialValue)
  }),
}))

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn(),
    watch: vi.fn(),
  }
})

describe('useAppAccessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.style.fontSize = ''
  })

  it('should initialize with default values', () => {
    const { zoom, MIN_ZOOM, MAX_ZOOM } = useAppAccessibility()

    expect(zoom.value).toBe(100)
    expect(MIN_ZOOM).toBe(87.5)
    expect(MAX_ZOOM).toBe(150)
  })

  it('should increase zoom correctly within limits', () => {
    const { zoom, increase, MAX_ZOOM } = useAppAccessibility()

    expect(zoom.value).toBe(100)

    increase()
    expect(zoom.value).toBe(106.25)

    zoom.value = MAX_ZOOM
    increase()

    expect(zoom.value).toBe(150)
  })

  it('should decrease zoom correctly within limits', () => {
    const { zoom, decrease, MIN_ZOOM } = useAppAccessibility()

    expect(zoom.value).toBe(100)

    decrease()
    expect(zoom.value).toBe(93.75)

    zoom.value = MIN_ZOOM
    decrease()

    expect(zoom.value).toBe(87.5)
  })

  it('should reset zoom to 100', () => {
    const { zoom, increase, reset } = useAppAccessibility()

    increase()
    increase()
    expect(zoom.value).not.toBe(100)

    reset()
    expect(zoom.value).toBe(100)
  })

  it('should register lifecycle hooks on init', async () => {
    const { onMounted, watch } = await import('vue')
    const { init } = useAppAccessibility()

    init()

    expect(onMounted).toHaveBeenCalled()
    expect(watch).toHaveBeenCalled()
  })

  it('should update DOM style when zoom changes', () => {
    const { zoom } = useAppAccessibility()

    document.documentElement.style.fontSize = `${zoom.value}%`
    expect(document.documentElement.style.fontSize).toBe('100%')

    zoom.value = 120
    document.documentElement.style.fontSize = `${zoom.value}%`
    expect(document.documentElement.style.fontSize).toBe('120%')
  })
})
