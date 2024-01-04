// export interface User {
//   phone: string
//   email: string
//   user_type: string
//   first_name: string
//   last_name: string
//   profile_pic?: string
// }

export interface Address {
  id: number
  user_id: number
  address_line1?: string
  address_line2?: string
  city: string
  post_code: number
  country: string
}

export interface UserProfile {
  first_name: string
  last_name: string
  email: string
  phone: string
  user_type: string
  profile_pic?: string
  addresses: Address[]
}

export interface CartItem {
  item_id: number
  cart_id: number
  product_id: string
  name: string
  price: number
  image_url?: string
  item_qty: number
}

export interface PaymentMethod {
  id: number
  user_id: number
  bank_account: number
  swift_code: string
  payment_type: string
}

export interface ShoppingCart {
  cart_id: number
  user_id: number
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: string
  name: string
  image_url?: string
  price: number
  item_qty: number
}

export interface Transaction {
  id: number
  amount: number
  amount_received: number
  capture_method: string
  created: number
  currency: string
  customer: string
  payment_id: string
  payment_method: string
  payment_method_types: string
  status: string
}

export interface Category {
  _id: string
  name: string
  parent_id?: string
  sub_categories?: Category[]
  products: Product[]
  display_order: number
  image_url?: string
}

export interface Product {
  _id: string
  name: string
  description: string
  category_id: string
  category?: Category
  image_url?: string
  price: number
  availability: boolean
  seller_id: number
  seller_profile?: UserProfile
}

export interface ApiResponse {
  status: {
    value: string
  }
  data?: any
}
