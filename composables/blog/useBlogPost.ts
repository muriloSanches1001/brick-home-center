export const useBlogPost = (id: number | string) => {
  const { blog } = useAppConfig()

  const post = computed(() => blog.find((p: {
    id: number
    date: string
    image_1: string
    title: string
    description_1: string
    description_2: string
    image_2: string
    subtitle: string
    description_3: string
  }) => p.id == id))

  const error = computed(() => !post.value ? 'Post não encontrado' : null)

  return {
    post,
    error,
  }
}
