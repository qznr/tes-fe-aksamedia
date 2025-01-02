<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <div class="flex-grow flex p-4 dark:bg-dark-bg dots" :class="{ 'flex-col': isMobile }">
      <template v-if="isMobile">
        <!-- Mobile Layout -->
        <div class="w-full p-4">
          <div class="bg-white rounded-lg shadow-md p-6 mb-4 dark:bg-gray-800 dark:shadow-none">
            <h3 class="text-lg font-semibold mb-2 dark:text-white text-gray-900">Island Top Right</h3>
            <p class="text-gray-700 dark:text-gray-300">Placeholder content for the top right island.</p>
          </div>
        </div>

        <div class="w-full p-4">
          <div class="bg-white rounded-lg shadow-md p-6 mb-4 dark:bg-gray-800 dark:shadow-none">
            <h2 class="text-2xl font-bold mb-4 dark:text-white text-gray-900">Employees</h2>
            <div class="rounded-lg overflow-hidden">
              <DataTable :data="employeesData" :columns="columns">
                <template #image="{ item }">
                  <img :src="item.image" alt="Employee Image" class="w-10 h-10 rounded-full">
                </template>
                <template #name="{ item }">
                  {{ item.name }}
                </template>
                <template #phone="{ item }">
                  {{ item.phone }}
                </template>
                <template #division="{ item }">
                  {{ item.division.name }}
                </template>
                <template #position="{ item }">
                  {{ item.position }}
                </template>
              </DataTable>
            </div>
          </div>
        </div>

        <div class="w-full p-4">
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h3 class="text-lg font-semibold mb-2 dark:text-white text-gray-900">Island Bottom Right</h3>
            <p class="text-gray-700 dark:text-gray-300">Placeholder content for the bottom right island.</p>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- Desktop Layout -->
        <!-- Left half: Table -->
        <div class="w-1/2 p-4">
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h2 class="text-2xl font-bold mb-4 dark:text-white text-gray-900">Employees</h2>
            <div class="rounded-lg overflow-hidden">
              <DataTable :data="employeesData" :columns="columns">
                <template #image="{ item }">
                  <img :src="item.image" alt="Employee Image" class="w-10 h-10 rounded-full">
                </template>
                <template #name="{ item }">
                  {{ item.name }}
                </template>
                <template #phone="{ item }">
                  {{ item.phone }}
                </template>
                <template #division="{ item }">
                  {{ item.division.name }}
                </template>
                <template #position="{ item }">
                  {{ item.position }}
                </template>
              </DataTable>
            </div>
          </div>
        </div>

        <!-- Right half: Islands -->
        <div class="w-1/2 flex flex-col p-4 space-y-4">
          <!-- Top right island -->
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h3 class="text-lg font-semibold mb-2 dark:text-white text-gray-900">Island Top Right</h3>
            <p class="text-gray-700 dark:text-gray-300">Placeholder content for the top right island.</p>
          </div>

          <!-- Bottom right island -->
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h3 class="text-lg font-semibold mb-2 dark:text-white text-gray-900">Island Bottom Right</h3>
            <p class="text-gray-700 dark:text-gray-300">Placeholder content for the bottom right island.</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '../components/layout/Navbar.vue';
import DataTable from '../components/common/DataTable.vue';
import employeesData from '../assets/employees.json';

const isMobile = ref(window.innerWidth < 1024); // lg breakpoint in Tailwind

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const columns = ref([
  { label: 'Image', key: 'image' },
  { label: 'Name', key: 'name' },
  { label: 'Phone', key: 'phone' },
  { label: 'Division', key: 'division' },
  { label: 'Position', key: 'position' },
]);
</script>

<style scoped>

</style>