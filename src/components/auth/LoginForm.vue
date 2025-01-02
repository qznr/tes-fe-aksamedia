<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
      <input type="text" id="username" v-model="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan username" required>
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" id="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan password" required>
    </div>
    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
  </form>
</template>
  
<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['submit']);

const username = ref('');
const password = ref('');

const handleSubmit = () => {
emit('submit', { username: username.value, password: password.value });
};
</script>