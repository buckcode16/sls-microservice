import type { Product, Category } from '~/types'

export function useGetProductsFromCategory() {
  const getProductsFromCategory = (category: Category): Product[] => {
    let allProducts = [] as Product[]

    const traverseCategories = (categories: any[]) => {
      for (const cat of categories) {
        if (cat.products && cat.products.length > 0) {
          allProducts = allProducts.concat(cat.products)
        }

        if (cat.subCategories && cat.subCategories.length > 0) {
          traverseCategories(cat.subCategories)
        }
      }
    }

    traverseCategories([category])
    return allProducts
  }

  return { getProductsFromCategory }
}
