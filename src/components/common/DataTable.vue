<template>
  <div class="overflow-x-auto">
    <table class="min-w-full rounded-lg overflow-hidden border border-black border-separate shadow-lg border-r-[3px] border-b-[3px]">
      <thead class="bg-white border border-black">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white  border border-black ">
        <tr v-for="item in displayedData" :key="item.id">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            <slot :name="column.key" :item="item" :column="column">{{ item[column.key] }}</slot>
          </td>
        </tr>
        <tr v-if="displayedData.length === 0 && data.length > 0">
          <td :colspan="columns.length" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            No data on this page.
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            No data available.
          </td>
        </tr>
        <tr v-if="data.length > pageSize">
          <td :colspan="columns.length" class="px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div class="flex justify-between items-center">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage * pageSize >= data.length"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      @click="previousPage"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button
                      v-for="page in totalPages"
                      :key="page"
                      @click="goToPage(page)"
                      :class="[
                        'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50',
                        { 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': currentPage === page },
                      ]"
                      aria-current="page"
                    >
                      {{ page }}
                    </button>
                    <button
                      @click="nextPage"
                      :disabled="currentPage * pageSize >= data.length"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
  pageSize: {
    type: Number,
    default: 5,
  },
});

const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.data.length / props.pageSize));

const startIndex = computed(() => (currentPage.value - 1) * props.pageSize + 1);
const endIndex = computed(() => Math.min(currentPage.value * props.pageSize, props.data.length));

const displayedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.data.slice(start, end);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};
</script>