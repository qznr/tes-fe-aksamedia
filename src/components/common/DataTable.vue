<template>
  <div class="overflow-x-auto">
    <div class="mb-4 flex flex-col items-start">
      <div class="mb-2 flex justify-between items-center">
        <button
          @click="clearFilters"
          class="px-4 py-2 rounded bg-transparent border border-[#8072D0]"
        >
          <div class="flex items-center gap-x-2">
            Clear
          <ion-icon name="filter"></ion-icon>
          </div>
        </button>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            class="ml-4 border focus:border-[#8072D0] appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-xs"
          />
      </div>
      <div v-if="activeFilters.length > 0" class="flex flex-wrap gap-2">
        <span
          v-for="(filter, index) in activeFilters"
          :key="index"
          class="inline-flex items-center px-3 py-1 rounded bg-[#8072D0] text-white text-sm"
        >
          {{ filter.category }}
           <button @click="removeFilter(index)" class="ml-1 focus:outline-none">
              <ion-icon name="close-outline" class="text-sm"></ion-icon>
           </button>
        </span>
      </div>
    </div>
    <table class="min-w-full rounded-lg overflow-hidden border border-black shadow-lg">
      <thead class="bg-white border border-black dark:bg-gray-700 dark:border-gray-600">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
          >
            <div class="flex items-center justify-between">
              <span>{{ column.label }}</span>
              <button
                v-if="filterableColumns.includes(column.key)"
                @click="toggleFilterMenu(column.key)"
                class="focus:outline-none"
              >
              <ion-icon name="filter"></ion-icon>
              </button>
              <div v-if="isFilterMenuOpen[column.key]" class="absolute z-10 mt-2 w-48 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <button
                    v-for="category in (filterCategories[column.key].categories ? filterCategories[column.key].categories : filterCategories[column.key])"
                    :key="category"
                    @click="applyFilter(column.key, category)"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 w-full text-left"
                  >
                    {{ category }}
                  </button>
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white border border-black dark:bg-gray-800 dark:border-gray-600">
        <tr v-for="item in displayedData" :key="item.id">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
          >
            <slot :name="column.key" :item="item" :column="column">{{ item[column.key] }}</slot>
          </td>
        </tr>
        <tr v-if="displayedData.length === 0 && filteredData.length > 0">
          <td :colspan="columns.length" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
            No data on this page.
          </td>
        </tr>
        <tr v-if="filteredData.length === 0 && searchQuery">
          <td :colspan="columns.length" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
            No matching results found.
          </td>
        </tr>
        <tr v-if="filteredData.length === 0 && !searchQuery && activeFilters.length === 0">
          <td :colspan="columns.length" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
            No data available.
          </td>
        </tr>
        <tr v-if="filteredData.length === 0 && activeFilters.length > 0 && !searchQuery">
          <td :colspan="columns.length" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
            No data matches the current filters.
          </td>
        </tr>
        <tr v-if="filteredData.length > pageSize">
          <td :colspan="columns.length" class="px-4 py-3 bg-white border-t border-gray-200 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage * pageSize >= filteredData.length"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
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
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600',
                        { 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900 dark:border-indigo-800 dark:text-indigo-300': currentPage === page },
                      ]"
                      aria-current="page"
                    >
                      {{ page }}
                    </button>
                    <button
                      @click="nextPage"
                      :disabled="currentPage * pageSize >= filteredData.length"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
import { defineProps, ref, computed, watch } from 'vue';

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
  searchColumns: {
    type: Array,
    default: () => null, // If null, search in all columns
  },
  filterableColumns: {
    type: Array,
    default: () => [], // Array of column keys that can be filtered
  },
  filterCategories: {
    type: Object,
    default: () => ({}),
    validator: (value) => {
      return Object.values(value).every(
        (item) =>
          Array.isArray(item) ||
          (typeof item === 'object' &&
            item !== null &&
            Array.isArray(item.categories) &&
            (item.key === undefined || typeof item.key === 'string'))
      );
    },
  },
});

const searchQuery = ref('');
const currentPage = ref(1);
const activeFilters = ref([]); // Array of active filters, e.g., [{ column: 'division', category: 'HR' }]
const isFilterMenuOpen = ref({}); // Object to track the open state of filter menus

const toggleFilterMenu = (columnKey) => {
  isFilterMenuOpen.value = {
    ...isFilterMenuOpen.value,
    [columnKey]: !isFilterMenuOpen.value[columnKey],
  };
};

const applyFilter = (columnKey, category) => {
  const filterExists = activeFilters.value.some(
    (filter) => filter.column === columnKey && filter.category === category
  );
  if (!filterExists) {
    activeFilters.value = [...activeFilters.value, { column: columnKey, category }];
  }
  isFilterMenuOpen.value[columnKey] = false; // Close the menu after applying filter
};

const removeFilter = (index) => {
    activeFilters.value.splice(index, 1);
};

const clearFilters = () => {
  activeFilters.value = [];
};

const filteredDataBeforeSearch = computed(() => {
    if (activeFilters.value.length === 0) {
        return props.data;
    }
    return props.data.filter(item =>
        activeFilters.value.some(filter => { // Use some for OR logic
            const filterConfig = props.filterCategories[filter.column];
            let itemValue;

            if (Array.isArray(filterConfig)) {
              // Simple filtering on a direct property
                itemValue = item[filter.column];
            } else if (typeof filterConfig === 'object' && filterConfig !== null && filterConfig.key) {
                // Filtering on a nested property
                const keys = filterConfig.key.split('.');
                itemValue = keys.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined), item);
            } else {
                // Fallback or error handling if the configuration is unexpected
                itemValue = item[filter.column];
            }
           return itemValue === filter.category;
        })
    );
});

const filteredData = computed(() => {
  if (!searchQuery.value) {
    return filteredDataBeforeSearch.value;
  }

  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return filteredDataBeforeSearch.value.filter(item => {
    const columnsToSearch = props.searchColumns || props.columns.map(col => col.key);
    return columnsToSearch.some(key => {
      const value = item[key];
      return value !== null && value !== undefined && value.toString().toLowerCase().includes(lowerCaseQuery);
    });
  });
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize));

const displayedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  const end = start + props.pageSize;
  return filteredData.value.slice(start, end);
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

// Reset to first page when filtered data changes (due to search or filter)
watch(filteredData, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
ion-icon {
    font-size: 16px;
}
</style>