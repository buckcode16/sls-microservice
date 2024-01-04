<template>
  <div v-if="product">
    <div class="border border-green-500">{{ product }}</div>
    <div class="border border-red-500">{{ product.seller_profile }}</div>
    <div class="border border-blue-500">{{ product.category }}</div>
  </div>
  <div v-else>
    <p>Loading product or Product not found...</p>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/productStore'
const route = useRoute()
const productStore = useProductStore()
const product = ref(null)

async function fetchProduct() {
  console.log('Fetching product for ID:', route.params.id)
  if (!productStore.isInitialized) {
    await productStore.initializeStore()
  }
  product.value = productStore.products.find((p) => p._id === route.params.id)
  console.log('Fetched product:', product.value)
}

onServerPrefetch(fetchProduct)

onMounted(() => {
  if (!product.value) {
    fetchProduct()
  }
})
</script>
