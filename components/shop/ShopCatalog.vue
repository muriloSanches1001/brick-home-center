<script setup lang="ts">
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseTextInput from '~/components/ui/inputs/BaseTextInput.vue'
import BaseArrowButton from '~/components/ui/buttons/BaseArrowButton.vue'
import { useCategories } from '~/composables/categories/useCategories'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseLoader from '~/components/ui/loaders/BaseLoader.vue'
import { useProducts } from '~/composables/products/useProducts'
import { useAppScroll } from '~/composables/ui/app/useAppScroll'

const route = useRoute()
const router = useRouter()

const { scrollToTop } = useAppScroll()

const { categories, pending: categoryPending, error: categoryError } = useCategories()
const { products, pagination, pending: productPending, error: productError, query } = useProducts({
  page: Number(route.query.page) || 0,
  search: (route.query.search as string) || '',
  categoryId: (route.query.category as string) || undefined,
})

// search

const searchInput = ref<string>((route.query.search as string) || '')

const search = () => {
  updateUrl({ search: searchInput.value, page: 0 })
}

// page

const changePage = (newPage: number) => {
  updateUrl({ page: newPage })
}

// category

const isActive = (id: string | number | undefined) => {
  if (id === undefined) return !query.value.categoryId
  return query.value.categoryId == id
}

const toggleCategory = (catId: string | number) => {
  const nextCategory = query.value.categoryId === catId ? undefined : catId
  updateUrl({ category: nextCategory, page: 0 })
}

// for updating when changing pages

watch(() => route.query, (newQuery) => {
  scrollToTop()
  query.value.page = Number(newQuery.page) || 0
  query.value.search = (newQuery.search as string) || ''
  query.value.categoryId = (newQuery.category as string) || undefined
})

const updateUrl = (newParams: Record<string, string | number | undefined>) => {
  scrollToTop()
  router.push({
    query: {
      ...route.query,
      ...newParams,
    },
  })
}
</script>

<template>
  <div class="flex w-full flex-col sm:flex-row gap-6 md:gap-12">
    <div class="flex flex-col gap-6 w-full sm:w-5/12 md:w-3/12">
      <div class="flex flex-col gap-4">
        <base-heading
          as="h2"
          size="lg"
          class="uppercase"
        >
          Busca
        </base-heading>
        <form
          action=""
          class="flex flex-col w-full gap-4"
          role="search"
          @submit.prevent="search"
        >
          <base-text-input
            id="shop-search"
            v-model="searchInput"
            name="search"
            type="text"
            size="md"
            placeholder="Digite sua busca"
            icon="uil:search"
            input-aria-label="Campo de busca"
            input-aria-describedby="search-description"
            :disabled="false"
            :required="false"
            bg="bg-neutral-50"
            class="w-full"
          />
          <base-arrow-button
            size="sm"
            type="submit"
          >
            Buscar
          </base-arrow-button>
        </form>
      </div>
      <div
        class="h-px w-full bg-neutral-900"
        aria-hidden="true"
      />
      <div class="flex w-full flex-col gap-4">
        <base-heading
          as="h2"
          size="lg"
          class="uppercase"
        >
          Categorias
        </base-heading>
        <ul
          class="flex flex-col gap-2"
        >
          <li class="w-full">
            <button
              type="button"
              :aria-pressed="isActive(undefined)"
              aria-label="Mostrar produtos de todas as categorias"
              class="w-full flex items-center px-4 py-3 border-[1px] rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              :class="[
                isActive(undefined)
                  ? 'bg-primary text-neutral-50 border-primary font-medium shadow-md'
                  : 'border-neutral-400 hover:bg-neutral-100 text-neutral-900 bg-transparent',
              ]"
              @click="updateUrl({ category: undefined, page: 0 })"
            >
              Todas as categorias
            </button>
          </li>

          <li
            v-if="categoryPending && !categories?.length"
            class="flex justify-center py-4"
          >
            <base-loader />
          </li>

          <template v-if="!categoryError && !categoryPending && categories?.length > 0">
            <li
              v-for="category in categories"
              :key="category.id"
              class="w-full"
            >
              <button
                type="button"
                :aria-pressed="isActive(category.id)"
                :aria-label="isActive(category.id) ? `Remover filtro da categoria ${category.name}` : `Filtrar por categoria ${category.name}`"
                class="w-full flex items-center px-4 py-3 border-[1px] rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                :class="[
                  isActive(category.id)
                    ? 'bg-primary text-neutral-50 border-primary font-medium shadow-md'
                    : 'border-neutral-400 hover:bg-neutral-100 text-neutral-900 bg-transparent',
                ]"
                @click="toggleCategory(category.id)"
              >
                {{ category.name }}
              </button>
            </li>
          </template>
        </ul>
        <div
          v-if="categoryError"
          class="h-[200px] flex justify-center items-center"
        >
          <base-text
            size="md"
            class="bg-red-800 text-neutral-50 px-4 py-2 rounded-full"
          >
            {{ categoryError }}
          </base-text>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6 w-full sm:w-7/12 md:w-9/12">
      <base-text size="sm">
        Mostrando <span class="text-primary">{{
          pagination.totalElements === 0 ? 0 : pagination.page * pagination.pageSize + 1
        }}-{{
          Math.min((pagination.page + 1) * pagination.pageSize, pagination.totalElements)
        }} de {{ pagination.totalElements }}</span>
      </base-text>
      <div
        v-if="!productPending && products.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="flex w-full"
        >
          <shop-item :product="product" />
        </div>
      </div>
      <div
        v-else-if="productPending"
        class="flex h-[200px] items-center justify-center"
      >
        <base-loader />
      </div>
      <div
        v-else-if="productError"
        class="h-[200px] flex justify-center items-center"
      >
        <base-text
          size="md"
          class="bg-red-800 text-neutral-50 px-4 py-2 rounded-full"
        >
          {{ productError }}
        </base-text>
      </div>
      <div
        v-else
        class="flex justify-center items-center"
      >
        <base-text
          size="md"
          class="text-neutral-900"
        >
          Não há produtos disponíveis no momento.
        </base-text>
      </div>
      <div
        v-if="pagination.totalElements > 0"
        class="flex w-full justify-between items-center gap-4 md:gap-8"
      >
        <div class="w-20 h-12 border-[1px] border-neutral-900 flex items-center justify-center">
          <base-text>{{ pagination.page + 1 }} / {{ pagination.totalPages }}</base-text>
        </div>
        <div class="flex gap-4">
          <button
            class="group flex justify-center items-center w-12 h-12 border-[1px] border-neutral-900 focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-default disabled:hover:bg-transparent cursor-pointer transition-colors duration-300 ease-in-out"
            aria-label="Página anterior"
            :disabled="pagination.page === 0"
            :aria-hidden="pagination.page === 0"
            type="button"
            @click="changePage(pagination.page - 1)"
          >
            <Icon
              name="material-symbols:arrow-left-alt-rounded"
              aria-hidden="true"
              class="bg-neutral-900 group-disabled:bg-neutral-900 group-hover:bg-neutral-50 group-focus:bg-neutral-50 w-6 h-6 transition-colors duration-300 ease-in-out"
            />
          </button>
          <button
            class="group flex justify-center items-center w-12 h-12 border-[1px] border-neutral-900 focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-default disabled:hover:bg-transparent cursor-pointer transition-colors duration-300 ease-in-out"
            aria-label="Próxima página"
            :disabled="pagination.page >= pagination.totalPages - 1"
            :aria-hidden="pagination.page >= pagination.totalPages - 1"
            type="button"
            @click="changePage(pagination.page + 1)"
          >
            <Icon
              name="material-symbols:arrow-right-alt-rounded"
              aria-hidden="true"
              class="bg-neutral-900 group-disabled:bg-neutral-900 group-hover:bg-neutral-50 group-focus:bg-neutral-50 w-6 h-6 transition-colors duration-300 ease-in-out"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
