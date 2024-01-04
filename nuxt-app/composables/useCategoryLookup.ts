import { useProductStore } from '~/stores/productStore'
import type { Category } from '~/types'

export function useCategoryLookup() {
  const productStore = useProductStore()

  function findCategoryById(
    categoryId: string,
    categories: any[],
  ): Category | null {
    for (const category of categories) {
      if (category._id === categoryId) {
        return category as Category
      }

      if (category.subCategories && category.subCategories.length > 0) {
        const foundCategory = findCategoryById(
          categoryId,
          category.subCategories,
        )
        if (foundCategory) {
          return foundCategory as Category
        }
      }
    }

    return null
  }

  function getCategoryAndSubcategories(categoryId: string): Category | null {
    const rootCategories: any[] = productStore.categories
    return findCategoryById(categoryId, rootCategories)
  }

  return { getCategoryAndSubcategories }
}
