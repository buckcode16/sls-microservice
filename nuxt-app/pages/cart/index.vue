<template>
  <div>
    <h1 class="text-4xl text-white m-4 pt-10">
      <UTooltip text="All Products">
        <Icon name="game-icons:warhammer" />
      </UTooltip>
      CART
    </h1>
    <div
      v-if="authStore.userCart && authStore.userCart.cartItems"
      class="bg-gray-100"
    >
      <div
        v-for="cartItem in authStore.userCart.cartItems"
        :key="cartItem.item_id"
        class="cart-item"
      >
        <div>{{ cartItem.name }}</div>
        <div class="counter">
          <button @click="updateQuantity(cartItem, -1)">-</button>
          <span>{{ cartItem.item_qty }}</span>
          <button @click="updateQuantity(cartItem, 1)">+</button>
        </div>
      </div>

      <div>Total Amount: {{ authStore.userCart.totalAmount }}</div>
    </div>
    <div
      id="card-element"
      class="border border-gray-500 p-2 rounded-sm bg-gray-100"
    ></div>
    <p
      id="card-error"
      role="alert"
      class="text-red-700 text-center font-semibold"
    ></p>
    <button
      @click="handlePayment"
      :disabled="isProcessing"
      class="mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
    >
      Pay with Stripe
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore'
import { loadStripe } from '@stripe/stripe-js'

const authStore = ref(useAuthStore())
const token = ref(authStore.value.token)
const runtimeConfig = useRuntimeConfig()
const isProcessing = ref(false)

let stripe, elements, card

onMounted(async () => {
  const paymentConfigResponse = await fetch(
    `${runtimeConfig.public.BASE_API_ENDPOINT}/collect-payment`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ amount: authStore.value.userCart.totalAmount }),
    },
  )

  const paymentConfigData = await paymentConfigResponse.json()
  const { publishableKey } = paymentConfigData.data

  // Ensure publishableKey is valid before proceeding
  if (!publishableKey) {
    console.error('Publishable key is not provided.')
    return
  }

  stripe = await loadStripe(publishableKey)
  elements = stripe.elements()

  const style = { base: { fontSize: '16px', color: '#32325d' } }
  card = elements.create('card', { style })
  card.mount('#card-element')
})

const handlePayment = async () => {
  isProcessing.value = true
  try {
    const paymentConfigResponse = await fetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/collect-payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({ amount: authStore.value.userCart.totalAmount }),
      },
    )

    const paymentConfigData = await paymentConfigResponse.json()
    const { secret } = paymentConfigData.data

    // Ensure secret is valid before proceeding
    if (!secret) {
      console.error('Secret key is not provided.')
      return
    }

    // Check if the card is mounted and create a payment method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    })

    if (error) {
      throw error
    }

    // Use the client secret to confirm the payment
    const paymentResult = await stripe.confirmCardPayment(secret, {
      payment_method: paymentMethod.id,
    })

    if (paymentResult.error) {
      throw paymentResult.error
    }

    if (paymentResult.paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentResult.paymentIntent)
      handleCreateOrder()
    } else {
      console.error('Payment failed:', paymentResult.paymentIntent)
    }
  } catch (error) {
    console.error('Payment request failed:', error)
    document.getElementById('card-error').textContent =
      error.message || 'Payment processing failed.'
  } finally {
    isProcessing.value = false
  }
}

const updateQuantity = async (cartItem, change) => {
  const newQuantity = cartItem.item_qty + change
  if (newQuantity <= 0) {
    await deleteCartItem(cartItem.item_id)
  } else {
    await updateCartItem(cartItem.item_id, newQuantity)
  }
}

const deleteCartItem = async (itemId) => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/cart/${itemId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }
    await authStore.value.fetchUserCart(token.value, runtimeConfig)
  } catch (error) {
    console.error('Error updating cart:', error)
  }
}

const updateCartItem = async (itemId, newQuantity) => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/cart/${itemId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qty: newQuantity,
        }),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }
  } catch (error) {
    console.error('Error updating cart:', error)
  }
  await authStore.value.fetchUserCart(token.value, runtimeConfig)
}

const handleCreateOrder = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/order`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    console.log('create order data', data)
  } catch (error) {
    console.error('Error creating cart:', error)
  }
}
</script>

<style scoped></style>
