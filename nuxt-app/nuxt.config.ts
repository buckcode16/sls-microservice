// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt', '@nuxt/ui', '@vee-validate/nuxt'],
  plugins: ['~/plugins/pinia-store-initializer'],
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      BASE_API_ENDPOINT: process.env.NUXT_APP_API_URL,
      PRODUCT_API_ENDPOINT: process.env.NUXT_APP_PRODUCT_API_URL,
      TRANSACTION_API_ENDPOINT: process.env.NUXT_APP_TRANSACTION_API_URL,
    },
  },
})
