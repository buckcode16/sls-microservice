import { defineStore } from 'pinia'
import type { UserProfile, ShoppingCart, CartItem } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: ref(false),
    token: ref(''),
    userProfile: ref<UserProfile | null>(null),
    userCart: ref<ShoppingCart | null>(null),
  }),
  actions: {
    async initAuthStore(runtimeConfig: any, ssrToken: string = '') {
      const isClient = typeof window !== 'undefined'
      const token = isClient ? localStorage.getItem('token') : ssrToken
      this.authenticated = !!token

      if (token) {
        await this.login(token, runtimeConfig, () => {})
      }
    },
    async login(
      token: string,
      runtimeConfig: any,
      onSuccessfulLogin: () => void,
    ) {
      this.authenticated = true
      this.token = token

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token)
        document.cookie = `token=${token};path=/;max-age=86400` // For SSR
      }

      await this.fetchUserProfile(token, runtimeConfig)
      await this.fetchUserCart(token, runtimeConfig)
      onSuccessfulLogin()
    },
    logout(onSuccessfulLogout: () => void) {
      this.authenticated = false
      this.userProfile = null
      this.token = ''
      this.userCart = null

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        document.cookie = 'token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }

      onSuccessfulLogout()
    },
    async fetchUserProfile(token: string, runtimeConfig: any) {
      try {
        const response = await fetch(
          `${runtimeConfig.public.BASE_API_ENDPOINT}/user`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        if (!response.ok) {
          throw new Error(
            'Failed to fetch user profile: Network response was not ok',
          )
        }
        this.userProfile = await response.json().then((data) => data.data)
      } catch (error) {
        console.error('Error during retrieving user profile:', error)
      }
    },
    async fetchUserCart(token: string, runtimeConfig: any) {
      try {
        const response = await fetch(
          `${runtimeConfig.public.BASE_API_ENDPOINT}/cart`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        if (!response.ok) {
          throw new Error(
            'Failed to fetch user cart: Network response was not ok',
          )
        }
        this.userCart = await response.json().then((data) => data.data)
      } catch (error) {
        console.error('Error during retrieving user cart:', error)
      }
    },
  },
})
