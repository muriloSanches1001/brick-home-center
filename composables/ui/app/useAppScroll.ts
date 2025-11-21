export const useAppScroll = () => {
  const scrollTop = useState<number>('app-scroll-scroll-top', () => 0)
  const isSticky = useState<boolean>('app-scroll-is-sticky', () => false)

  const updateScrollTop = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
    isSticky.value = target.scrollTop > 50
  }

  return { updateScrollTop, isSticky }
}
