export const useAppAccessibility = () => {
  const ZOOM_STEP = 6.25
  const MAX_ZOOM = 150
  const MIN_ZOOM = 87.5
  const HIGH_CONTRAST_CLASS = 'high-contrast'
  const LARGE_CURSOR_CLASS = 'large-cursor'

  const zoom = useCookie<number>('accessibility-zoom', {
    default: () => 100,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const highContrast = useCookie<boolean>('accessibility-high-contrast', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const largeCursor = useCookie<boolean>('accessibility-large-cursor', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const updateDom = () => {
    if (import.meta.client) {
      document.documentElement.style.fontSize = `${zoom.value}%`
    }
  }

  const updateHighContrastDom = () => {
    if (import.meta.client) {
      document.body.classList.toggle(HIGH_CONTRAST_CLASS, highContrast.value)
    }
  }

  const updateLargeCursorDom = () => {
    if (import.meta.client) {
      document.body.classList.toggle(LARGE_CURSOR_CLASS, largeCursor.value)
    }
  }

  const increase = () => {
    if (zoom.value < MAX_ZOOM) {
      zoom.value += ZOOM_STEP
      updateDom()
    }
  }

  const decrease = () => {
    if (zoom.value > MIN_ZOOM) {
      zoom.value -= ZOOM_STEP
      updateDom()
    }
  }

  const reset = () => {
    zoom.value = 100
    updateDom()
  }

  const toggleHighContrast = () => {
    highContrast.value = !highContrast.value
    updateHighContrastDom()
  }

  const toggleLargeCursor = () => {
    largeCursor.value = !largeCursor.value
    updateLargeCursorDom()
  }

  const init = () => {
    onMounted(() => {
      updateDom()
      updateHighContrastDom()
      updateLargeCursorDom()
    })

    watch(zoom, () => updateDom())
    watch(highContrast, () => updateHighContrastDom())
    watch(largeCursor, () => updateLargeCursorDom())
  }

  return {
    zoom,
    MIN_ZOOM,
    MAX_ZOOM,
    increase,
    decrease,
    reset,
    highContrast,
    toggleHighContrast,
    largeCursor,
    toggleLargeCursor,
    init,
  }
}
