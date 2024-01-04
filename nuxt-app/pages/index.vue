<template>
  <div>
    <!-- Hero content (image, headings, CTA buttons, etc.) -->
    <section>
      <Hero />
    </section>

    <!-- Brands -->
    <section></section>

    <!-- Scale models & Miniatures subsection -->
    <section>
      <header>
        <div
          class="h-16 text-white grid bg-cover bg-[url('https://www.games-workshop.com/resources/touts/2023-06-03/GW-9thedCombat-2023-06-03-Portal-All-bm_.jpg')] bg-center bg-no-repeat"
        >
          <div
            class="bg-gradient-to-l from-gray-700/75 via-gray-900/50 to-black w-full h-full"
          >
            <h2 class="m-5 uppercase">Scale models & miniatures</h2>
          </div>
        </div>
      </header>
      <div class="grid grid-cols-3">
        <div class="bg-gray-100 p-2 col-span-1">
          <div class="flex flex-col bg-gray-100">
            <div class="p-3">
              <h1 class="my-3 uppercase text-3xl font-bold">
                For the God-Emperor!
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi facilis assumenda explicabo maxime voluptate quam.
                Maxime tempora explicabo illo corporis.
              </p>
              <div class="flex flex-row gap-2 flex-wrap mt-7 mx-5">
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Warhammer 40k
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Age of Sigmar
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Tamiya
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Flames of War
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  A Song of Ice & Fire
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  DnD
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Star Wars X-Wing
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Star Wars Legion
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Marvel Crisis Protocol
                </UBadge>
              </div>
              <div class="mt-3 text-right">
                <a href="#" class="text-sm">
                  View all scale models & miniatures ->
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <div
            class="overflow-x-auto scrollbar-none scroll-pl-6 snap snap-x snap-mandatory scroll-smooth px-6 py-6"
          >
            <NuxtLink :to="`/products`" v-if="productStore.isInitialized">
              All products
            </NuxtLink>
            <NuxtLink
              :to="`/products/categories/65941c3cb3f15c230857ce51`"
              v-if="productStore.isInitialized"
            >
              Category
            </NuxtLink>
            <NuxtLink
              :to="`/products/seller`"
              v-if="productStore.isInitialized"
            >
              Seller
            </NuxtLink>
            <ul
              class="grid grid-rows-1 grid-flow-col auto-rows-max w-max gap-2 pr-6"
            >
              <li
                v-for="product in productStore.products"
                :key="product._id"
                class="list-none snap-start"
                v-if="productStore.isInitialized"
              >
                <NuxtLink :to="`/products/${product._id}`">
                  <Card
                    :product="product"
                    v-if="products && products.length > 0"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Subsection 3 content -->
    <section>
      <header>
        <div
          class="h-16 text-white grid bg-cover bg-[url('https://schwerkraft-verlag.de/media/image/f2/bf/5b/terraforming-mars-deluxe-spielertableaus-4719-skv11237wFyIOBYdNQRM_600x600@2x.jpg')] bg-cover bg-center bg-no-repeat"
        >
          <div
            class="bg-gradient-to-l from-gray-700/75 via-gray-900/50 to-black w-full h-full"
          >
            <h2 class="m-5 uppercase">Board Games</h2>
          </div>
        </div>
      </header>
      <div class="grid grid-cols-3">
        <div class="bg-gray-100 p-2 col-span-1">
          <div class="flex flex-col bg-gray-100">
            <div class="p-3">
              <h1 class="my-3 uppercase text-3xl font-bold">
                Immerse Yourself in a World of Strategy and Adventure!
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi facilis assumenda explicabo maxime voluptate quam.
                Maxime tempora explicabo illo corporis.
              </p>
              <div class="flex flex-row gap-2 flex-wrap mt-7 mx-5">
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Ravensburger
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  FryxGames
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Awaken Realms
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Stonemaier
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Dire Wolf Digital
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Fantasy Flight Games
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Kosmos
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Rio Grande Games
                </UBadge>
                <UBadge
                  size="xs"
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-black px-3 py-1"
                >
                  Days of Wonder
                </UBadge>
              </div>
              <div class="mt-3 text-right">
                <a href="#" class="text-sm">
                  View all board games ->
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-span-2">
          <div
            class="overflow-x-auto scrollbar-none scroll-pl-6 md:scroll-pl-3 snap snap-x snap-mandatory scroll-smooth px-6 md:px-3 py-6"
          >
            <ul
              class="grid grid-rows-1 grid-flow-col auto-rows-max w-max gap-2 md:gap-4 pr-6 md:pr-3"
            >
              <li
                v-for="product in products2.products"
                :key="product.id"
                class="list-none snap-start w-[160px] md:w-[256px]"
              >
                <Card :product="product" />
              </li>
            </ul>
          </div>
        </div> -->
      </div>
    </section>

    <!-- Subsection 4 content -->
    <section></section>

    <!-- Blog post listing -->
    <section>
      <Blog />
    </section>

    <!-- Newsletter CTA -->
    <section><CTA /></section>
  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/productStore'

const productStore = useAsyncData(() => {
  useProductStore()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
