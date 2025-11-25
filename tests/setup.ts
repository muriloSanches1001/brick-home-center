import { beforeEach } from 'vitest'
import { setup } from '@nuxt/test-utils'
import { clearNuxtData } from '#app'

beforeEach(async () => {
  await setup()
  clearNuxtData()
})
