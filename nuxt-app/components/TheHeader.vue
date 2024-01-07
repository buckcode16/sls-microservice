<template>
  <div>
    <header>
      <div
        class="flex py-6 mb-4 justify-between items-center text-white font-light"
      >
        <!-- Logo -->
        <NuxtLink :to="`/`">
          <img class="w-[100px]" src="../assets/images/logo-3.png" alt="" />
        </NuxtLink>

        <!-- Search Login SignUp -->
        <div>
          <ul class="flex gap-4 items-center">
            <div>
              <UTooltip text="Search">
                <Icon name="material-symbols:search-rounded" />
              </UTooltip>
            </div>

            <NuxtLink :to="`/profile`">
              <UTooltip text="Profile">
                <Icon name="material-symbols:person-2-outline" />
              </UTooltip>
            </NuxtLink>
            <NuxtLink :to="`/cart`">
              <UTooltip text="Cart">
                <Icon name="material-symbols:shopping-bag-outline" />
              </UTooltip>
            </NuxtLink>
            <NuxtLink v-if="!authStore.authenticated" :to="`/login`">
              <UTooltip text="Login">
                <Icon name="material-symbols:login-sharp" />
              </UTooltip>
            </NuxtLink>
            <button @click="handleLogout" v-if="authStore.authenticated">
              <UTooltip text="Logout">
                <Icon name="material-symbols:logout-sharp" />
              </UTooltip>
            </button>
            <button v-else @click="handleLogin">Quick Login</button>
            <NuxtLink v-if="!authStore.authenticated" :to="`/register`">
              <UBadge color="fuchsia">
                <p class="text-black">Sign Up</p>
              </UBadge>
            </NuxtLink>
          </ul>
        </div>
      </div>
    </header>

    <NavigationCategory />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore'

const runtimeConfig = useRuntimeConfig()
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'seller@newnew.com',
          password: 'password',
        }),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    let token
    if (typeof data.value === 'string') {
      token = JSON.parse(data.value).data.token
    } else {
      token = data.value.data.token
    }

    authStore.login(token, runtimeConfig, () => {
      // router.push('/')
    })
  } catch (error) {
    console.error('Error during login:', error)
  }
}

const handleLogout = () => {
  authStore.logout(() => {
    // router.push('/login')
    console.log('logged out')
  })
}
</script>

<style scoped></style>
