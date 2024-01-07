<template>
  <div>
    <h1 class="text-4xl text-white m-4 pt-10">
      <UTooltip text="Seller Products">
        <Icon name="game-icons:warhammer" />
      </UTooltip>
      SELLER
    </h1>
  </div>
  <div v-if="productsBySeller">
    <header className="mb-16 flex flex-col items-center justify-center">
      <h1 className="mb-1 font-mono text-4xl text-gray-100 ">
        hi, I'm {{ sellerProfile.first_name }} {{ sellerProfile.last_name }} 👋
      </h1>
      <div className="mt-2 text-xl text-gray-400 font-semibold ">
        Welcome to my shop!
      </div>
      <div class="mt-2 text-gray-400 flex flex-col italic">
        <div>
          <p>
            <Icon name="material-symbols:alternate-email-rounded" />
            {{ sellerProfile.email }}
          </p>
          <p>
            <Icon name="material-symbols:call" />
            {{ sellerProfile.phone }}
          </p>
          <p>
            <Icon name="ph:address-book" />
            {{ sellerProfile.address[0].address_line1 }},
            {{ sellerProfile.address[0].address_line2 }},
            {{ sellerProfile.address[0].city }},
            {{ sellerProfile.address[0].postcode }}
            {{ sellerProfile.address[0].country }}
          </p>
        </div>
      </div>
    </header>
    <div class="mt-2">
      <ul class="flex flex-wrap gap-2 justify-center">
        <li v-for="product in productsBySeller" :key="product._id">
          <NuxtLink :to="`/products/${product._id}`">
            <Card :product="product" class="w-[250px]" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>products by seller not found.</p>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/productStore'

const route = useRoute()
const productStore = useProductStore()
const productsBySeller = computed(() => {
  return productStore.products.filter(
    (p) => p.seller_id === parseInt(route.params.id),
  )
})

const sellerProfile = computed(() => {
  return productStore.sellers[route.params.id]
})
</script>

<style scoped></style>
