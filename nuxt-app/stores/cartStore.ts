// import { defineStore } from 'pinia'
// import type { Product, CartItem } from '~/types'

// export const useCartStore = defineStore('cart', {
//   state: () => ({
//     cart: [] as CartItem[],
//   }),
//   actions: {
//     addToCart(product: Product, quantity: number = 1) {
//       const existingProduct = this.cart.find(
//         (item) => item.product_id === product.id,
//       )
//       if (existingProduct) {
//         existingProduct.quantity += quantity
//       } else {
//         this.cart.push({
//           product_id: product.id,
//           name: product.name,
//           price: product.price,
//           quantity: quantity,
//         })
//       }
//     },
//     removeFromCart(productId: string) {
//       const index = this.cart.findIndex((item) => item.product_id === productId)
//       if (index !== -1) {
//         this.cart.splice(index, 1)
//       }
//     },
//     updateItemQuantity(productId: string, quantity: number) {
//       const product = this.cart.find((item) => item.product_id === productId)
//       if (product) {
//         product.quantity = quantity
//       }
//     },
//   },
// })
