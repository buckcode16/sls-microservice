<template>
  <section>
    <div class="flex flex-col items-center justify-center">
      <div>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-[500px]">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Register
          </h1>

          <form class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                v-model="phone"
                type="phone"
                name="phone"
                id="phone"
                placeholder="+60123456789"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                v-model="first_name"
                type="first_name"
                name="first_name"
                id="first_name"
                placeholder="John"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="last_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                v-model="last_name"
                type="last_name"
                name="last_name"
                id="last_name"
                placeholder="Doe"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                v-model="address"
                type="address"
                name="address"
                id="address"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                class="ml-1 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="handleSignUp"
            >
              Submit
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account yet?
              <NuxtLink
                to="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// definePageMeta({
//   auth: {
//     unauthenticatedOnly: true,
//     navigateAuthenticatedTo: '/',
//   },
// })
import { useAuthStore } from '~/stores/authStore'
const authStore = useAuthStore()

const email = ref(null)
const password = ref(null)
const phone = ref(null)
const first_name = ref(null)
const last_name = ref(null)
const address = ref(null)

const runtimeConfig = useRuntimeConfig()
const router = useRouter()

const handleSignUp = async () => {
  try {
    const signupResponse = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `${email.value}`,
          password: `${password.value}`,
          phone: `${phone.value}`,
        }),
      },
    )

    if (signupResponse.error.value) {
      console.error('Error during signup:', signupResponse.error.value)
      return
    }

    let token
    if (typeof signupResponse.data.value === 'string') {
      token = JSON.parse(signupResponse.data.value).data.token
    } else {
      token = signupResponse.data.value.data.token
    }

    const profileResponse = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: `${first_name.value}`,
          lastName: `${last_name.value}`,
          userType: 'BUYER',
          address: {
            addressLine1: 'my address 1',
            addressLine2: 'my address 2',
            city: 'Cologne',
            postCode: '50667',
            country: 'DE',
          },
        }),
      },
    )

    if (profileResponse.error.value) {
      console.error('Error creating profile:', profileResponse.error.value)
      return
    }

    authStore.login(token, () => {
      router.push('/')
    })
  } catch (error) {
    console.error('Error during signup process:', error)
  }
}
</script>
