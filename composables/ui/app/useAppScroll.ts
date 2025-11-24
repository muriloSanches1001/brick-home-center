let scrollElement: HTMLElement | null = null

export const useAppScroll = () => {
  const scrollTop = useState<number>('app-scroll-scroll-top', () => 0)
  const isSticky = useState<boolean>('app-scroll-is-sticky', () => false)

  const registerScrollElement = (el: HTMLElement) => {
    scrollElement = el
    useEventListener(scrollElement, 'scroll', updateScrollTop)
  }

  const updateScrollTop = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
    isSticky.value = target.scrollTop > 50
  }

  const scrollToTop = (smooth = true) => {
    if (!scrollElement) return

    scrollElement.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  return {
    scrollTop,
    isSticky,
    updateScrollTop,
    registerScrollElement,
    scrollToTop,
  }
}
