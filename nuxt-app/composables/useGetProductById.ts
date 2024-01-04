import { useProductStore } from '~/stores/productStore'

export function useGetProductById() {
  const productStore = useProductStore()

  const getProductById = (id: string) => {
    return productStore.products.find((product) => product._id === id)
  }

  return { getProductById }
}
