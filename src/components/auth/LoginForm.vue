<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <TextInput id="username" label="Username" placeholder="Masukkan username" v-model="username" />
    </div>
    <div>
      <PasswordInput id="password" label="Password" placeholder="Masukkan password" v-model="password" />
    </div>
    <button type="submit" class="w-full text-white bg-black skew-x-[-20deg] hover:bg-opacity-65 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      <div class="skew-x-[20deg]">
        Login
      </div>  
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import TextInput from '../common/TextInput.vue';
import PasswordInput from '../common/PasswordInput.vue';

const emit = defineEmits(['submit']);

const username = ref('');
const password = ref('');

const handleSubmit = () => {
  emit('submit', { username: username.value, password: password.value });
};
</script>
