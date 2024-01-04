import { defineStore } from 'pinia'
import type { UserProfile } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: ref(false),
    token: ref(''),
    userProfile: ref<UserProfile | null>(null),
  }),
  actions: {
    login(token: string, onSuccessfulLogin: () => void) {
      const runtimeConfig = useRuntimeConfig()
      this.authenticated = true
      this.token = token

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token)
      }

      this.fetchUserProfile(token)
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token)
      }

      onSuccessfulLogin()
    },
    logout(onSuccessfulLogout: () => void) {
      this.authenticated = false
      this.userProfile = null
      this.token = ''

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }

      onSuccessfulLogout()
    },

    async fetchUserProfile(token: string) {
      const runtimeConfig = useRuntimeConfig()
      const { data, error } = await useFetch(
        `${runtimeConfig.public.BASE_API_ENDPOINT}/user`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (error.value) {
        console.error('Failed to fetch user profile:', error.value)
        return
      }

      console.log('Received user profile:', data.value)

      let userProfileData
      if (typeof data.value === 'string') {
        // Prod format
        try {
          userProfileData = JSON.parse(data.value).data
        } catch (error) {
          console.error('Error parsing data:', error)
          return
        }
      } else {
        // Dev format
        userProfileData = data.value.data
      }

      // Access addresses safely
      const addresses = userProfileData?.address

      // Check if addresses is defined
      if (!addresses) {
        console.error('Addresses is undefined')
      }

      this.userProfile = userProfileData
    },
  },
})
