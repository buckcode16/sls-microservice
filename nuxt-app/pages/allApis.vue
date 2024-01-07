<template>
  <!-- <div class="flex flex-col justify-center items-center">
    <h1 class="text-xl font-bold text-gray-900">
      Welcome back
    </h1>
    <Form :validation-schema="loginSchema" @submit.prevent="onSubmit">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Email
      </label>
      <Field name="email" type="email" placeholder="Email" />
      <ErrorMessage name="email" />
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        Password
      </label>
      <Field name="password" type="password" placeholder="Password" />
      <ErrorMessage name="password" />

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
            <label for="remember" class="text-gray-500 dark:text-gray-300">
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
        <button
          type="submit"
          class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Login
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?
          <NuxtLink
            to="/register"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </NuxtLink>
        </p>
      </div>
    </Form>
  </div> -->

  <button v-if="authenticated" @click="handleLogout">Logout</button>
  <button v-else @click="handleLogin">Login</button>

  <!-- <div class="flex flex-col items-center justify-center">
    <div>
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-[500px]">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Welcome back
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
                <label for="remember" class="text-gray-500 dark:text-gray-300">
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
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click.prevent="handleLogin"
          >
            Sign in
          </button>
          <button
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click.prevent="handleSignUp"
          >
            Sign up
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?
            <NuxtLink
              to="/register"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div> -->
  <!-- User Login -->
  <button
    type="button"
    class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    @click.prevent="handleLogin"
  >
    User Login
  </button>

  <!-- User Registration (Create User) -->
  <button
    type="button"
    class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    @click.prevent="handleSignUp"
  >
    Register User
  </button>

  <!-- Edit Profile -->
  <button
    type="button"
    class="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    @click.prevent="handleEditProfile"
  >
    Edit Profile
  </button>

  <!-- View Products -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleViewProducts"
    >
      View Products
    </button>
    <ul>
      <li v-for="product in products">{{ product }}</li>
    </ul>
  </div>

  <!-- View Product by Id -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleViewProductById"
    >
      View Product by Id
    </button>
    <p class="border border-blue-500" v-if="product">{{ product }}</p>
  </div>

  <!-- Create Order -->
  <button
    type="button"
    class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    @click.prevent="handleCreateOrder"
  >
    Create Order
  </button>

  <!-- Join Seller Program -->
  <button
    type="button"
    class="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    @click.prevent="handleJoinSeller"
  >
    Join Seller Program
  </button>

  <!-- Get Cart -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleGetCart"
    >
      Get Cart
    </button>
    <p v-if="cart">{{ cart }}</p>
  </div>

  <!-- Create Cart -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleCreateCart"
    >
      Create Cart
    </button>
  </div>

  <!-- Update Cart -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleUpdateCart"
    >
      Update Cart
    </button>
  </div>

  <!-- Delete Cart -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleDeleteCart"
    >
      Delete Cart
    </button>
  </div>

  <!-- Create Order -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-stone-600 hover:bg-stone-700 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="CreateOrder"
    >
      Create Order
    </button>
  </div>

  <!-- Get Order -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleGetOrder"
    >
      Get Order
    </button>
    <ul>
      <li v-for="order in orders">{{ order }}</li>
    </ul>
  </div>

  <!-- Get All Categories -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleGetCategories"
    >
      Get All Categories
    </button>
    <ul>
      <li v-for="category in categories">{{ category }}</li>
    </ul>
  </div>

  <!-- Get Category by Id -->
  <div>
    <button
      type="button"
      class="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click.prevent="handleGetCategoryById"
    >
      Get Category by Id
    </button>
    <p v-if="category">{{ category }}</p>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const handleLogin = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'user@user.com', password: 'password' }),
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

    authStore.login(token, () => {
      // router.push('/dashboard')
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

const handleSignUp = async () => {
  try {
    // Step 1: Call Signup API
    const signupResponse = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'user4@user4.com',
          password: 'password',
          phone: '+60132331122',
        }),
      },
    )

    if (signupResponse.error.value) {
      console.error('Error during signup:', signupResponse.error.value)
      return // Stop the process if signup fails
    }

    let token
    if (typeof signupResponse.data.value === 'string') {
      token = JSON.parse(signupResponse.data.value).data.token
    } else {
      token = signupResponse.data.value.data.token
    }

    // Step 2: Call Create Profile API
    const profileResponse = await useFetch(
      `${runtimeConfig.public.API_ENDPOINT}/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: 'Buc',
          lastName: 'Wong',
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
      return // Stop the process if creating profile fails
    }

    // Login
    authStore.login(token, () => {
      // router.push('/dashboard')
    })

    // Step 3: Handle Verification (Assuming it's a separate process)
    // Trigger any action needed for verification here, e.g., showing a prompt to the user to enter the verification pin.
  } catch (error) {
    console.error('Error during signup process:', error)
  }
}

const new_firstName = 'PaniBuc'
const new_lastName = 'Wong'
const new_address_id = 1
const new_address = {
  id: new_address_id,
  addressLine1: 'my edited address 1',
  addressLine2: 'my edited address 2',
  city: 'Cologne',
  postCode: '50667',
  country: 'DE',
}
const handleEditProfile = async () => {
  console.log('user_type', authStore.userProfile.user_type)
  console.log('store_token', store_token.value)
  console.log('address', new_address)
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/user`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store_token.value}`,
        },
        body: JSON.stringify({
          firstName: new_firstName,
          lastName: new_lastName,
          userType: authStore.userProfile.user_type,
          address: new_address,
        }),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    authStore.fetchUserProfile(store_token.value)
  } catch (error) {
    console.error('Error during profile update:', error)
  }
}

const products = ref([])
const handleViewProducts = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/product`,
      {
        method: 'GET',
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    if (typeof data.value === 'string') {
      products.value = JSON.parse(data.value).data
    } else {
      products.value = data.value.data
    }

    console.log('data', data.value)
  } catch (error) {
    console.error('Error during retrieving products for view:', error)
  }
}

const product_id = '6590791336f7b98a2d7cf5ab'
const product = ref()
const handleViewProductById = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/product/${product_id}`,
      {
        method: 'GET',
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    if (typeof data.value === 'string') {
      product.value = JSON.parse(data.value).data
    } else {
      product.value = data.value.data
    }

    console.log('data', data.value)
  } catch (error) {
    console.error('View product by ID error:', error)
  }
}

const cart = ref()
const handleGetCart = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/cart`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${store_token.value}`,
        },
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    if (typeof data.value === 'string') {
      cart.value = JSON.parse(data.value).data
    } else {
      cart.value = data.value.data
    }
  } catch (error) {
    console.error('Error getting cart:', error)
  }
}

const handleCreateCart = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/cart`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store_token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qty: 2,
          productId: `${product_id}`,
        }),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }
  } catch (error) {
    console.error('Error creating cart:', error)
  }
}

const item_id = '1'
const item_qty = 3
const handleUpdateCart = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/cart/${item_id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${store_token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qty: item_qty,
        }),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }
  } catch (error) {
    console.error('Error updating cart:', error)
  }
}

const cart_item_id = '2'
const handleDeleteCart = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/cart/${cart_item_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${store_token.value}`,
        },
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }
  } catch (error) {
    console.error('Error updating cart:', error)
  }
}

const handleCreateOrder = async () => {}

const orders = ref([])
const handleGetOrder = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.TRANSACTION_API_ENDPOINT}/orders`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${store_token.value}`,
        },
      },
    )

    if (typeof data.value === 'string') {
      orders.value = JSON.parse(data.value).orders
    } else {
      orders.value = data.value.orders
    }

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }
  } catch (error) {
    console.error('Error getting orders:', error)
  }
}

const categories = ref([])
const handleGetCategories = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/category`,
      {
        method: 'GET',
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    if (typeof data.value === 'string') {
      categories.value = JSON.parse(data.value).data
    } else {
      categories.value = data.value.data
    }
  } catch (error) {
    console.error('Error during retrieving products for view:', error)
  }
}

const category_id = '65941e28b7011ca1c9a7e7a9'
const offset = 0
const per_page = 10
const category = ref()
const handleGetCategoryById = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.PRODUCT_API_ENDPOINT}/category/${category_id}?offset=${offset}&perPage=${per_page}`,
      {
        method: 'GET',
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    if (typeof data.value === 'string') {
      category.value = JSON.parse(data.value).data
    } else {
      category.value = data.value.data
    }
    console.log('category', category.value)
  } catch (error) {
    console.error('Error during retrieving products for view:', error)
  }
}

const handleJoinSeller = async () => {}

const authenticated = computed(() => authStore.authenticated)
const store_token = computed(() => authStore.token)
</script>

<style scoped></style>
