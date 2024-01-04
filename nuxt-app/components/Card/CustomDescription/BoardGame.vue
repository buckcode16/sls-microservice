<template>
  <p class="mb-2 text-gray-700">
    Players:
    <span>{{ props.product.attributes.players }}</span>
  </p>
  <p class="mb-2 text-gray-700">
    Duration:
    <span>{{ props.product.attributes.playing_time }}</span>
  </p>
  <p class="mb-2 text-gray-700">
    Complexity:
    <span>{{ props.product.attributes.complexity }}</span>
  </p>
</template>

<script setup>
const props = defineProps(['product'])
</script>

<style scoped></style>
