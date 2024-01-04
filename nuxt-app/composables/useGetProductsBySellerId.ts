import { useProductStore } from '~/stores/productStore'
import type { Product } from '~/types'

export function useGetProductsBySellerId() {
  const productStore = useProductStore()

  function getProductsBySellerId(sellerId: number): Product[] {
    return productStore.products.filter(
      (product) => product.seller_id === sellerId,
    )
  }

  return { getProductsBySellerId }
}
