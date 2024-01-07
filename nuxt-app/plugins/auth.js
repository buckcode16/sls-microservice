import { useAuthStore } from '~/stores/authStore'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()
  const tokenCookie = useCookie('token')

  if (process.server) {
    // Server-side token handling
    if (tokenCookie.value && tokenCookie.value !== 'none') {
      console.log('initAuthStore server-side')
      authStore.initAuthStore(runtimeConfig, tokenCookie.value)
    }
  } else {
    // Client-side
    const token = localStorage.getItem('token')
    if (token && token !== 'none') {
      console.log('initAuthStore client-side')
      authStore.initAuthStore(runtimeConfig)
    }
  }
})
