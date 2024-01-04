<template>
  <div v-if="productsBySeller">
    <ul class="grid grid-rows-1 grid-flow-col auto-rows-max w-max gap-2 pr-6">
      <li
        v-for="product in productsBySeller"
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
    <p>products by seller not found.</p>
  </div>
</template>

<script setup>
import { useGetProductsBySellerId } from '~/composables/useGetProductsBySellerId'

const sellerId = 6
const { getProductsBySellerId } = useGetProductsBySellerId()
const productsBySeller = ref([])

onMounted(() => {
  productsBySeller.value = getProductsBySellerId(sellerId)
})
</script>
