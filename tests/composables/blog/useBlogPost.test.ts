import { describe, expect, it } from 'vitest'
import { useBlogPost } from '~/composables/blog/useBlogPost'

describe('useBlogPost (Integration)', () => {
  it('should find a post by id successfully using real config data', () => {
    const { post, error } = useBlogPost(1)

    expect(post.value?.title).toBe('Como Planejar a Reforma da Sua Casa Sem Dor de Cabeça')
    expect(post.value?.id).toBe(1)
    expect(error.value).toBeNull()
  })

  it('should return error when post is not found', () => {
    const { post, error } = useBlogPost(999)

    expect(post.value).toBeUndefined()
    expect(error.value).toBe('Post não encontrado')
  })

  it('should handle type coercion (string id matching number id)', () => {
    const { post } = useBlogPost('2')

    expect(post.value?.title).toBe('Qual Piso Escolher para Cada Ambiente da Casa')
    expect(post.value?.id).toBe(2)
  })

  it('should retrieve correct data for different IDs', () => {
    const post1 = useBlogPost(1).post
    const post3 = useBlogPost(3).post

    expect(post1.value?.title).toContain('Reforma')
    expect(post3.value?.title).toContain('Cimento, Argamassa e Rejunte')
  })
})
