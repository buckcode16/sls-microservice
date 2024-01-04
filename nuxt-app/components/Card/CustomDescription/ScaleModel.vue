<template>
  <p class="mb-2 text-gray-700">
    Scale:
    <span>{{ props.product.attributes.scale }}</span>
  </p>
  <p class="mb-2 text-gray-700">
    Type:
    <span>{{ props.product.attributes.type }}</span>
  </p>
</template>

<script setup>
const props = defineProps(['product'])
</script>

<style scoped></style>
