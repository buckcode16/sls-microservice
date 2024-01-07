// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vee-validate/nuxt',
    '@unlok-co/nuxt-stripe',
    'nuxt-icon',
  ],
  plugins: ['~/plugins/pinia-store-initializer', '~/plugins/auth'],
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      BASE_API_ENDPOINT: process.env.NUXT_APP_API_URL,
      PRODUCT_API_ENDPOINT: process.env.NUXT_APP_PRODUCT_API_URL,
      TRANSACTION_API_ENDPOINT: process.env.NUXT_APP_TRANSACTION_API_URL,
      STRIPE_PK: process.env.STRIPE_PUBLISHABLE_KEY,
      STRIPE_SK: process.env.STRIPE_SECRET_KEY,
    },
  },
  stripe: {
    client: {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  },
  routeRules: {
    '/login': { prerender: true },
    '/products': { prerender: true },
    '/register': { prerender: true },
    '/cart': { prerender: true },
    '/profile': { prerender: true },
  },
  app: {
    head: {
      script: [{ src: 'https://js.stripe.com/v3/', defer: true }],
    },
  },
})
