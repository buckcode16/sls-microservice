<template>
  <div>
    <h1 class="text-4xl text-white m-4 pt-10">
      <UTooltip text="Profile">
        <Icon name="game-icons:warhammer" />
      </UTooltip>
      Profile
    </h1>
  </div>

  <div class="h-full">
    <div class="block flex">
      <div class="rounded mr-2 w-2/5 p-4 bg-gray-100 shadow-md">
        <div class="flex justify-between">
          <span class="text-xl font-semibold block">Profile</span>
          <div v-if="authStore.userProfile">
            <a v-if="!isEditMode" href="#" @click="toggleEditMode">
              <Icon name="material-symbols:edit-outline" />
            </a>
            <template v-else>
              <a class="mx-4" @click="handleSaveProfile">
                <Icon name="material-symbols:check-small" />
              </a>
              <a class="mx-4" @click="toggleEditMode(false)">
                <Icon name="material-symbols:close-rounded" />
              </a>
            </template>
          </div>
        </div>
        <div class="pt-10">
          <div class="pb-6">
            <label
              for="first_name"
              class="font-semibold text-gray-700 block pb-1"
            >
              First Name
            </label>
            <div class="flex">
              <input
                :disabled="!isEditMode"
                id="first_name"
                class="border-1 rounded-r px-4 py-2 w-full"
                type="text"
                v-model="editProfile.first_name"
              />
            </div>
          </div>
          <div class="pb-6">
            <label
              for="last_name"
              class="font-semibold text-gray-700 block pb-1"
            >
              Last Name
            </label>
            <div class="flex">
              <input
                :disabled="!isEditMode"
                id="last_name"
                class="border-1 rounded-r px-4 py-2 w-full"
                type="text"
                v-model="editProfile.last_name"
              />
            </div>
          </div>
          <div class="pb-6">
            <label for="phone" class="font-semibold text-gray-700 block pb-1">
              Phone
            </label>
            <div class="flex">
              <input
                :disabled="!isEditMode"
                id="phone"
                class="border-1 rounded-r px-4 py-2 w-full"
                type="text"
                v-model="editProfile.phone"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-4/5 rounded p-8 bg-gray-100 shadow-md">
        Order
        <UTable
          :rows="
            orders.map((order) => ({
              ...order,
              amount: formatAmount(order.amount),
              created_at: formatDate(order.created_at),
              updated_at: formatDate(order.updated_at),
            }))
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore'

const runtimeConfig = useRuntimeConfig()
const authStore = useAuthStore()

const isEditMode = ref(false)
const originalProfile = ref({})
const editProfile = ref({})
const orders = ref([])

const formatAmount = (amount) => {
  return (amount / 100).toFixed(2)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}

const handleGetOrders = async () => {
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.TRANSACTION_API_ENDPOINT}/orders`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    if (data.value) {
      orders.value = data.value.orders
    }

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }
  } catch (error) {
    console.error('Error during get orders:', error)
  }
}

watch(
  () => authStore.userProfile,
  (newProfile) => {
    editProfile.value = { ...newProfile }
    originalProfile.value = { ...newProfile }
    handleGetOrders()
  },
  { immediate: true },
)

function toggleEditMode(edit = true) {
  isEditMode.value = edit
  if (!edit) {
    editProfile.value = { ...originalProfile.value }
  }
}

function handleSaveProfile() {
  originalProfile.value = { ...editProfile.value }
  handleEditProfile()
  toggleEditMode(false)
}

const handleEditProfile = async () => {
  console.log('authStore.token.value', authStore.token)
  try {
    const { data, error } = await useFetch(
      `${runtimeConfig.public.BASE_API_ENDPOINT}/user`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({
          firstName: editProfile.value.first_name,
          lastName: editProfile.value.last_name,
          phone: editProfile.value.phone,
          userType: authStore.userProfile.user_type,
          address: authStore.userProfile.address[0],
        }),
      },
    )

    if (error.value) {
      console.error('Error fetching data:', error.value)
    }

    authStore.fetchUserProfile(authStore.token, runtimeConfig)
  } catch (error) {
    console.error('Error during profile update:', error)
  }
}
</script>

<style scoped></style>
