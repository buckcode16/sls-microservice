<template>
  <div v-if="productsByCategory">
    <ul class="grid grid-rows-1 grid-flow-col auto-rows-max w-max gap-2 pr-6">
      <li
        v-for="product in productsByCategory"
        :key="product._id"
        class="list-none snap-start"
      >
        <NuxtLink :to="`/products/${product._id}`">
          <Card :product="product" />
        </NuxtLink>
      </li>
    </ul>
    {{ productsByCategory }}
  </div>
  <div v-else>
    <p>category not found.</p>
  </div>
</template>

<script setup>
import { useCategoryLookup } from '~/composables/useCategoryLookup'
import { useGetProductsFromCategory } from '~/composables/useGetProductsFromCategory'
import { useProductStore } from '~/stores/productStore'

const route = useRoute()
const productStore = useProductStore()
const { getCategoryAndSubcategories } = useCategoryLookup()
const { getProductsFromCategory } = useGetProductsFromCategory()
const category = useAsyncData(async () => {
  if (!productStore.isInitialized) {
    await productStore.initializeStore()
  }

  const categoryId = route.params.id
  const foundCategory = getCategoryAndSubcategories(categoryId)

  if (foundCategory) {
    return getProductsFromCategory(foundCategory)
  }
})
const productsByCategory = ref([])
</script>
