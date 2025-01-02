<template>
    <div class="flex items-start space-x-4">
      <img :src="item.image" alt="Employee Image" class="w-12 h-12 rounded-full">
      <div>
        <h4 class="font-semibold text-lg text-gray-900 dark:text-white">{{ item.name }}</h4>
        <p class="text-gray-600 dark:text-gray-400">
          <span class="font-medium">Phone:</span> {{ item.phone }}
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          <span class="font-medium">Division:</span> {{ item.division.name }}
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          <span class="font-medium">Position:</span> {{ item.position }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  
  </style>