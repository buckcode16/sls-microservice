import { defineStore } from 'pinia'
import type { Product, Category, UserProfile } from '~/types'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: ref<Product[]>([]),
    categories: ref<Category[]>([]),
    sellers: ref<{ [key: number]: UserProfile }>({}),
    isInitialized: ref(false),
  }),
  // Endpoints
  // Fetch categories: GET : `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/category`
  // Fetch products: GET : `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/product`
  // Fetch seller profile by id: GET : `${runtimeConfig.public.BASE_API_ENDPOINT}/seller-profile/${sellerId}`
  // Fetch category by id: GET : `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/category/${categoryId}`
  actions: {
    async initProductStore(runtimeConfig: any) {
      if (this.isInitialized) {
        return
      }
      await this.fetchProducts(runtimeConfig)
      await this.fetchCategories(runtimeConfig)
      await this.appendSellerProfileAndCategoryToProducts(runtimeConfig)

      this.isInitialized = true
    },

    async fetchProducts(runtimeConfig: any) {
      try {
        const response = await fetch(
          `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/product`,
        )
        if (!response.ok) {
          throw new Error(
            'Failed to fetch products: Network response was not ok',
          )
        }
        const responseData = await response.json()
        this.products = responseData.data
      } catch (error) {
        console.error('Error during retrieving products:', error)
      }
    },

    async fetchCategories(runtimeConfig: any) {
      try {
        const response = await fetch(
          `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/category`,
        )
        if (!response.ok) {
          throw new Error(
            'Failed to fetch categories: Network response was not ok',
          )
        }
        const responseData = await response.json()
        this.categories = responseData.data
      } catch (error) {
        console.error('Error during retrieving categories:', error)
      }
    },

    async fetchCategoryById(runtimeConfig: any, categoryId: number) {
      try {
        const response = await fetch(
          `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/category/${categoryId}`,
        )
        if (!response.ok) {
          throw new Error(
            'Failed to fetch category: Network response was not ok',
          )
        }
        const responseData = await response.json()
        return responseData.data
      } catch (error) {
        console.error('Error during retrieving category:', error)
      }
    },

    async fetchSellerProfileById(runtimeConfig: any, sellerId: number) {
      if (this.sellers[sellerId]) {
        return this.sellers[sellerId]
      }

      try {
        const response = await fetch(
          `${runtimeConfig.public.BASE_API_ENDPOINT}/seller-profile/${sellerId}`,
        )
        if (!response.ok) {
          throw new Error(
            'Failed to fetch seller profile: Network response was not ok',
          )
        }
        const responseData = await response.json()
        this.sellers[sellerId] = responseData.data

        return responseData.data
      } catch (error) {
        console.error('Error during retrieving seller profile:', error)
      }
    },

    async appendSellerProfileAndCategoryToProducts(runtimeConfig: any) {
      for (const product of this.products) {
        if (product.seller_id) {
          try {
            const sellerProfile = await this.fetchSellerProfileById(
              runtimeConfig,
              product.seller_id,
            )
            product.seller_profile = sellerProfile
          } catch (error) {
            console.error(
              `Error fetching seller profile for product ${product._id}:`,
              error,
            )
          }
        }

        try {
          const category = await this.fetchCategoryById(
            runtimeConfig,
            product.category_id,
          )
          product.category = category
        } catch (error) {
          console.error(
            `Error fetching category for product ${product._id}:`,
            error,
          )
        }
      }
    },
  },
})
