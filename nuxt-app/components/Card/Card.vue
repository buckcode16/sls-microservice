<template>
  <div class="rounded-lg shadow font-roboto bg-gray-100 ">
    <img
      :src="product.image_url"
      class="max-w-full max-h-full mx-auto mb-auto h-[8.8rem] w-[8.8rem] pt-3"
      alt=""
    />
    <div class="px-6 py-4 grid grid-rows-2" >
      <div>
        <p class="mb-3 text-xs text-gray-400 uppercase">
        <h2
          href="/"
          aria-label="Category"
        >
          {{ product.category.name }}
        </h2>
      </p>
      <h2
        href="/"
        aria-label="Category"
        title=""
        class=""
      >
        {{ product.name }}
      </h2>
    </div>
      <div class="mt-3">
        <p class="text-xl mb-2 text-green-700">$<span>{{ product.price }}</span></p>
      <hr />
      <div class="mt-2 text-gray-400 text-xs">
        <p>Brand  : <span>{{ product.category.name }}</span></p>
        <p>Sold by: <span>{{ product.seller_profile.last_name }}</span></p>
      </div>
      </div>
      
      <!-- <component :is="ProductCard(product.category)" :product="product" /> -->
    </div>
  </div>
</template>

<script setup>
import ScaleModel from './CustomDescription/ScaleModel.vue'
import BoardGame from './CustomDescription/BoardGame.vue'
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()

const props = defineProps({
  product: Object,
})

// const ProductCard = computed(() => {
//   switch (props.product.category) {
//     case 'Scale model & Miniature':
//       return ScaleModel;
//     case 'Boardgame':
//       return BoardGame;
//     default:
//       return ;
//   }
// });
</script>

<style scoped></style>
