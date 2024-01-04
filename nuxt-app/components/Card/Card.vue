<template>
  <div class="rounded-lg shadow h-[30rem] w-[256px]">
    <img
      :src="product.image_url"
      class="max-w-full max-h-full mx-auto mb-auto h-[8.8rem] w-[8.8rem]"
      alt=""
    />
    <div class="px-6 py-4">
      <p class="mb-3 text-xs font-semibold uppercase">
        <h2
          href="/"
          class="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
          aria-label="Category"
          title="traveling"
        >
          {{ product.category.name }}
        </h2>
      </p>
      <h2
        href="/"
        aria-label="Category"
        title=""
        class="break-words inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
      >
        {{ product.name }}
      </h2>
      <p class="mb-2 text-gray-700">
        Price:
        <span>{{ product.price }}</span>
      </p>
      <p class="mb-2 text-gray-700">
        Brand:
        <span>{{ product.category.name }}</span>
      </p>
      <p class="mb-2 text-gray-700">
        Sold by:
        <span>{{ product.seller_profile.last_name }}</span>
      </p>
      <hr />
      <component :is="ProductCard(product.category)" :product="product" />
    </div>
  </div>
</template>

<script setup>
import ScaleModel from './CustomDescription/ScaleModel.vue'
import BoardGame from './CustomDescription/BoardGame.vue'

const props = defineProps(['product'])
const product = ref(props.product)
const ProductCard = (category) => {
  switch (category) {
    case 'Scale model & Miniature':
      return ScaleModel
    case 'Boardgame':
      return BoardGame
  }
}

</script>

<style scoped></style>
