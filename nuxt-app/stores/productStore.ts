import { defineStore } from 'pinia'
import type { Product, Category, UserProfile } from '~/types'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: ref<Product[]>([]),
    categories: ref<Category[]>([]),
    sellers: ref<{ [key: number]: UserProfile }>({}),
    isInitialized: false,
  }),
  actions: {
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
    async initializeStore(runtimeConfig: any) {
      try {
        await this.fetchCategories(runtimeConfig)
        await this.fetchProducts(runtimeConfig)
        await this.enhanceProductsWithSellerAndCategory(runtimeConfig)
        this.isInitialized = true
        console.log('Store initialized')
        // console.log('Categories:', this.categories)
        // console.log('Products:', this.products)
      } catch (error) {
        console.error('Error during initialization:', error)
      }
    },
    async fetchSellerProfile(runtimeConfig: any, sellerId: number) {
      // Avoid refetching if this seller's profile exists in the store
      if (this.sellers[sellerId]) {
        return this.sellers[sellerId]
      }
      console.log('Fetching seller profile for sellerId:', sellerId)

      try {
        const response = await fetch(
          `${runtimeConfig.public.BASE_API_ENDPOINT}/seller-profile/${sellerId}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const sellerProfile = await response.json()
        this.sellers[sellerId] = sellerProfile.data
        return sellerProfile.data
      } catch (error) {
        console.error('Error during retrieving seller profile:', error)
      }
    },
    async fetchCategoryById(runtimeConfig: any, categoryId: string) {
      console.log('Fetching category by id:', categoryId)

      try {
        const response = await fetch(
          `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/category/${categoryId}`,
        )
        if (!response.ok) {
          throw new Error(
            'Failed to fetch category: Network response was not ok',
          )
        }
        const categoryData = await response.json()
        return categoryData.data
      } catch (error) {
        console.error('Error during retrieving category:', error)
      }
    },
    async enhanceProduct(runtimeConfig: any, product: Product) {
      if (product.seller_id) {
        const sellerProfile = await this.fetchSellerProfile(
          runtimeConfig,
          product.seller_id,
        )
        product.seller_profile = sellerProfile
      }
      const category = await this.fetchCategoryById(
        runtimeConfig,
        product.category_id,
      )
      if (category) {
        product.category = category
      }
    },
    async enhanceProductsWithSellerAndCategory(runtimeConfig: any) {
      // Enhance all root level products
      await Promise.all(
        this.products.map((product) =>
          this.enhanceProduct(runtimeConfig, product),
        ),
      )
      // Function to recursively enhance products in categories
      const enhanceProductsInCategories = async (
        runtimeConfig: any,
        categories: any[],
      ) => {
        for (const category of categories) {
          if (category.products) {
            await Promise.all(
              category.products.map((product: Product) =>
                this.enhanceProduct(runtimeConfig, product),
              ),
            )
          }
          if (category.subCategories) {
            await enhanceProductsInCategories(
              runtimeConfig,
              category.subCategories,
            )
          }
        }
      }
      // Enhance products in each category
      await enhanceProductsInCategories(runtimeConfig, this.categories)
    },
  },
})
