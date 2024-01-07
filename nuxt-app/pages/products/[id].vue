<template>
  <div>
    <h1 class="text-4xl text-white m-4 pt-10">
      <UTooltip text="Product">
        <Icon name="game-icons:warhammer" />
      </UTooltip>
      PRODUCT
    </h1>
  </div>
  <div v-if="product" class="mt-1 rounded grid grid-cols-4 gap-2">
    <div class="border rounded bg-gray-100 col-span-3">
      <div class="grid-rows-2">
        <div class="row-span-1 p-4">
          <!-- {{ product }} -->
          <div class="flex justify-between">
            <h2 class="text-3xl">{{ product.name }}</h2>
            <p class="text-4xl">
              <Icon color="green" name="ph:currency-circle-dollar" />
              <span>{{ product.price }}</span>
            </p>
          </div>
          <UButton color="black" @click="handleAddToCart">
            Add to Cart
          </UButton>
          <div class="flex justify-between mt-10">
            <h3 class="text-gray-500">Description</h3>
          </div>
          <p>{{ product.description }}</p>
          <div>
            <h3 class="text-gray-500 pt-10">Category</h3>
            <p>{{ product.category.name }}</p>
          </div>
        </div>
        <!-- <div
          class="row-span-1 flex flex-col justify-start items-start w-full space-y-8"
        >
          <div class="flex justify-start items-start">
            <p
              class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 dark:text-white"
            >
              Reviews
            </p>
          </div>
          <div
            class="w-full flex justify-start items-start flex-col bg-gray-100 dark:bg-gray-800 p-8"
          >
            <div class="flex flex-col md:flex-row justify-between w-full">
              <div class="flex flex-row justify-between items-start">
                <p
                  class="text-xl md:text-2xl font-medium leading-normal text-gray-800 dark:text-white"
                >
                  Epic and immersive, just the way I love it
                </p>
              </div>
            </div>
            <div id="menu" class="md:block">
              <p
                class="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6"
              >
                Perfect for anyone who cherishes both strategy and storytelling
                in their gaming experience.
              </p>
              <div
                class="mt-6 flex justify-start items-center flex-row space-x-2.5"
              >
                <div>
                  <img src="../../assets/images/logo-1.png" class="w-14" />
                </div>
                <div class="flex flex-col justify-start items-start space-y-2">
                  <p
                    class="text-base font-medium leading-none text-gray-800 dark:text-white"
                  >
                    Warhammer Fanatic
                  </p>
                  <p class="text-sm leading-none text-gray-600 dark:text-white">
                    21 October 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="border rounded bg-gray-100 col-span-1">
      <div class="grid-rows-2">
        <div class="row-span-1"><img :src="product.image_url" alt="" /></div>
        <div class="row-span-1 flex justify-center">
          <div class="flex flex-col font-iconso p-4">
            <p>
              Seller
              <span>
                {{ product.seller_profile.first_name }}
                {{ product.seller_profile.last_name }}
              </span>
            </p>
            <p>
              Email
              <span>{{ product.seller_profile.email }}</span>
            </p>
            <p>
              Contact
              <span>{{ product.seller_profile.phone }}</span>
            </p>
            <UButton color="black" class="w-[80%] justify-center mt-2">
              <NuxtLink :to="`seller/${product.seller_id}`">
                Seller products
              </NuxtLink>
            </UButton>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-span-4 py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center"
    ></div>
  </div>
  <div v-else>
    <p>Loading product or Product not found...</p>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/productStore'
import { useAuthStore } from '~/stores/authStore'

const route = useRoute()
const productStore = useProductStore()
const authStore = useAuthStore()
const runtimeConfig = useRuntimeConfig()

const product = computed(() => {
  return productStore.products.find((p) => p._id === route.params.id)
})

const handleAddToCart = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/cart`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qty: 1,
          productId: `${product.value._id}`,
        }),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    await authStore.fetchUserCart(authStore.token, runtimeConfig)
  } catch (error) {
    console.error('Error creating cart:', error)
  }
}
</script>
