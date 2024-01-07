import { useProductStore } from '~/stores/productStore'

export default defineNuxtPlugin(async (nuxtApp) => {
  const productStore = useProductStore()

  if (!productStore.isInitialized) {
    await productStore.initProductStore(useRuntimeConfig())
  }
})
