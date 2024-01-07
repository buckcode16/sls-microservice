<template>
  <div>
    <h1 class="text-4xl text-white m-4 pt-10">
      <UTooltip text="All Products">
        <Icon name="game-icons:warhammer" />
      </UTooltip>
      ALL PRODUCTS
    </h1>
  </div>
  <div v-if="productStore.products" class="mt-7">
    <ul class="flex flex-wrap gap-1 justify-center mt-2">
      <li
        v-for="product in productStore.products"
        :key="product._id"
        class="list-none snap-start"
      >
        <NuxtLink :to="`/products/${product._id}`">
          <Card :product="product" class="w-[250px]" />
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>products not found.</p>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()
</script>
