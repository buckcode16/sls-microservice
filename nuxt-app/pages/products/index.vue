<template>
  <div v-if="allProducts">
    <ul class="grid grid-rows-1 grid-flow-col auto-rows-max w-max gap-2 pr-6">
      <li
        v-for="product in allProducts"
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
    <p>products not found.</p>
  </div>
  empty page
</template>

<script setup>
import { useProductStore } from '~/stores/productStore'

const allProducts = useProductStore().products
</script>
