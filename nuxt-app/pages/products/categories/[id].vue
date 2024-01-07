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
  </div>
  <div v-else>
    <p>category not found.</p>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/productStore'

const route = useRoute()
const productStore = useProductStore()

function findCategory(categories, categoryId) {
  for (const category of categories) {
    if (category._id === categoryId) {
      return category
    }
    if (category.subCategories) {
      const found = findCategory(category.subCategories, categoryId)
      if (found) return found
    }
  }
  return null
}

// Recursive function to collect all category IDs
function getAllCategoryIds(category) {
  let ids = [category._id]

  if (category.subCategories) {
    for (const subCategory of category.subCategories) {
      ids = ids.concat(getAllCategoryIds(subCategory))
    }
  }

  return ids
}

const categoryId = route.params.id
const productsByCategory = computed(() => {
  const category = findCategory(productStore.categories, categoryId)
  if (!category) {
    console.error('Category not found for ID:', categoryId)
    return []
  }

  const allCategoryIds = getAllCategoryIds(category)
  return productStore.products.filter((product) =>
    allCategoryIds.includes(product.category_id),
  )
})
</script>
