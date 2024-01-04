<template>
  <div
    class="pl-7 bg-paper-primary pt-4 pb-0 hidden md:flex border-b border-neutral"
  >
    <!-- Hamburger all categories -->
    <button
      type="button"
      class="group hidden md:flex md:mr-6 md:pb-3 cK_xUFG6 p-0 bg-transparent cursor-pointer border-0 leading-[inherit] text-current hover:text-link-primary-hover rounded-md focus-visible-outline-default no-underline"
      data-test="desktop-burger-menu"
    >
      <div class="h-4 mr-2 relative w-5">
        <span
          class="absolute block duration-150 ease-linear origin-right h-px right-0 transition-transform w-full transform-gpu bg-black group-hover:bg-grey-400 top-0 group-hover:scale-x-75"
        ></span>
        <span
          class="absolute block duration-150 ease-linear origin-left h-px left-0 top-1/2 transition-transform w-full transform-gpu bg-black group-hover:bg-grey-400 group-hover:scale-x-75"
        ></span>
        <span
          class="absolute block duration-150 ease-linear origin-right h-px right-0 transition-transform w-full transform-gpu bg-black group-hover:bg-grey-400 top-full group-hover:scale-x-75"
        ></span>
      </div>
      <span class="body-2-bold self-end">
        All items
      </span>
    </button>
    <div class="items-center flex-1 overflow-hidden whitespace-nowrap">
      <div class="flex items-center overflow-x-scroll pb-3 scrollbar-hide">
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">Promotions</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">Top Sellers</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">New In Stock</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Strategy Games
        </span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Tabletop RPGs
        </span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">Family Games</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">Miniatures</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">Warhammer</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Dungeon & Dragons
        </span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">Scale Models</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Airbrush Paints
        </span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Airbrush Accessories
        </span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Airbrush Parts
        </span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Airbrush & Spray Guns
        </span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">3D Printer</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">Filament</span>
        <span class="mr-6 body-2-light first:pl-6 last:mr-8">
          Printer Parts
        </span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
