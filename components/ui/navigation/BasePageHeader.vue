<script setup lang="ts">
import BaseContainer from '~/components/ui/sections/BaseContainer.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

const route = useRoute()

interface BreadcrumbItem {
  label: string
  to?: string
}

const props = defineProps<{
  items?: BreadcrumbItem[]
  title?: string
}>()

const formatLabel = (text: string): string => {
  return text
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

const crumbs = computed(() => {
  if (props.items) return props.items

  const pathArray = route.path.split('/').filter(p => p)
  const breadcrumbs: BreadcrumbItem[] = []

  breadcrumbs.push({ label: 'Início', to: '/' })

  let currentPath = ''

  pathArray.forEach((segment) => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      label: formatLabel(segment),
      to: currentPath,
    })
  })

  return breadcrumbs
})

const currentTitle = computed(() => {
  if (props.title) return props.title

  const lastCrumb = crumbs.value[crumbs.value.length - 1]
  return lastCrumb ? lastCrumb.label : 'Início'
})
</script>

<template>
  <nav
    class="flex w-full min-h-[450px] bg-[url('/images/ui/navigation/breadcrumb/bg.jpg')] bg-cover bg-center bg-no-repeat"
    aria-label="Cabeçalho da página"
  >
    <base-container>
      <div
        class="w-full h-full pt-[calc(70px+50px)] pb-[70px] md:pt-[calc(100px+50px)] md:pb-[100px] flex items-center justify-between gap-8 relative"
      >
        <div class="flex flex-col gap-4">
          <base-heading
            as="h1"
            size="2display"
            class="text-neutral-50 font-bold tracking-tight"
          >
            {{ currentTitle }}
          </base-heading>
          <ol class="flex flex-wrap items-center gap-2 text-neutral-50 text-sm md:text-base font-medium">
            <li
              v-for="(crumb, index) in crumbs"
              :key="crumb.to"
              class="flex items-center gap-2"
            >
              <span
                v-if="index > 0"
                class="text-primary-soft select-none font-bold"
                aria-hidden="true"
              >/</span>

              <nuxt-link
                v-if="index < crumbs.length - 1"
                :to="crumb.to"
                class="hover:text-primary-soft transition-colors duration-200"
              >
                {{ crumb.label }}
              </nuxt-link>

              <span
                v-else
                class="text-primary-soft"
                aria-current="page"
              >
                {{ crumb.label }}
              </span>
            </li>
          </ol>
        </div>
        <base-text
          class="absolute hidden md:flex bottom-[100px] right-0 text-neutral-300 max-w-[250px] text-right"
          size="sm"
        >
          Da fundação ao acabamento, garantimos os materiais certos para cada etapa da sua obra.
        </base-text>
      </div>
    </base-container>
  </nav>
</template>
