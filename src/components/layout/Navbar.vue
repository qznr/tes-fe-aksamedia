<template>
  <nav class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <RouterLink to="/" class="font-bold text-xl text-gray-800 dark:text-white">
              My App
            </RouterLink>
          </div>
        </div>
        <div class="flex items-center ml-4 md:ml-6">
          <div class="mr-4" v-if="user">
            <span class="text-gray-700 dark:text-gray-300">{{ user.fullName || user.username }}</span>
          </div>
          <Dropdown :align="right" width="48">
            <template #trigger>
              <button class="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Open user menu</span>
                <ion-icon name="person-circle-outline" class="text-2xl text-gray-700 dark:text-gray-300"></ion-icon>
              </button>
            </template>
            <template #content>
              <DropdownItem @click="goToSettings">Settings</DropdownItem>
              <DropdownItem @click="handleLogout">Logout</DropdownItem>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '../../composables/auth';
import { useRouter, RouterLink } from 'vue-router';
import { useLocalStorage } from '../../composables/localStorage';
import Dropdown from '../common/Dropdown.vue';
import DropdownItem from '../common/DropdownItem.vue';
import { computed } from 'vue';

const { logout, isAuthenticated } = useAuth(); // Get isAuthenticated here
const router = useRouter();
const { getItem } = useLocalStorage();

const user = computed(() => getItem('user'));

const handleLogout = () => {
  console.log('isAuthenticated before logout:', isAuthenticated.value); // Now it will work
  logout();
  console.log('isAuthenticated after logout:', isAuthenticated.value);  // Now it will work
};

const goToSettings = () => {
  router.push('/settings');
};
</script>