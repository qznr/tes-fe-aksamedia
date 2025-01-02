<template>
  <div class="text-center">
    Hewwow >///<
  </div>
  <button @click="handleLogout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Logout
  </button>

</template>
<script setup>
import { useAuth } from '../composables/auth'

const { logout } = useAuth()

const handleLogout = () => {
  logout();
}

</script>