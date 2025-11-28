export const useAppAccessibility = () => {
  const ZOOM_STEP = 6.25
  const MAX_ZOOM = 150
  const MIN_ZOOM = 87.5

  const zoom = useCookie<number>('accessibility-zoom', {
    default: () => 100,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  })

  const updateDom = () => {
    if (import.meta.client) {
      document.documentElement.style.fontSize = `${zoom.value}%`
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

  const init = () => {
    onMounted(() => {
      updateDom()
    })

    watch(zoom, () => updateDom())
  }

  return {
    zoom,
    MIN_ZOOM,
    MAX_ZOOM,
    increase,
    decrease,
    reset,
    init
  }
}
