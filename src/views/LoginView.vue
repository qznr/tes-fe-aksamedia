<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg dark:bg-gray-800">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center">Login ke Aplikasi</h3>
      <LoginForm @submit="handleLogin" />
    </div>
  </div>
</template>
  
<script setup>
import LoginForm from '../components/auth/LoginForm.vue';
import { useAuth } from '../composables/auth';

const { login } = useAuth();

const handleLogin = ({ username, password }) => {
login(username, password);
};
</script>