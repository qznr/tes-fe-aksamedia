<template>
  <div class="space-y-4">
    <!-- Search Input -->
    <input
      v-if="searchable"
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="border focus:border-[#8072D0] appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
    />

    <!-- Filter Buttons -->
    <div v-if="filterable && Object.keys(filterCategories).length > 0" class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="(filter, index) in activeFilters"
        :key="index"
        class="inline-flex items-center px-3 py-1 rounded bg-[#8072D0] text-white text-sm"
      >
        {{ filter.column }}: {{ filter.category }}
        <button @click="removeFilter(index)" class="ml-1 focus:outline-none">
          <ion-icon name="close-outline" class="text-sm"></ion-icon>
        </button>
      </button>
      <button v-if="activeFilters.length > 0" @click="clearFilters" class="px-4 py-2 rounded bg-transparent border border-[#8072D0] text-sm">
        Clear All
      </button>
      <div v-for="(filterCategory, column) in filterCategories" :key="column" class="relative inline-block">
        <div class="relative">
        <button @click="toggleFilterMenu(column)" class="px-4 py-2 rounded bg-transparent border border-[#8072D0] text-sm">
          <div class="flex items-center gap-x-2">
            {{ column }}
            <ion-icon name="filter"></ion-icon>
          </div>
        </button>
         <div v-if="isFilterMenuOpen[column]" class="absolute z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <button
              v-for="category in (filterCategory.categories ? filterCategory.categories : filterCategory)"
              :key="category"
              @click="applyFilter(column, category)"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 w-full text-left"
            >
              {{ category }}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>

    <!-- List Items -->
    <div
      v-if="displayedData.length > 0"
      v-for="item in displayedData"
      :key="item.id"
      class="bg-white rounded-lg p-4 dark:bg-gray-800"
    >
      <component :is="itemComponent" :item="item" />
      <hr v-if="showDivider" class="mt-4 border-t border-gray-300 dark:border-gray-700" />
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">
      {{ emptyMessage }}
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="flex justify-center items-center mt-4 text-white">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 mx-1 rounded bg-primary hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="mx-2 text-gray-700 dark:text-gray-300">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 mx-1 rounded bg-primary hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  itemComponent: {
    type: Object,
    required: true,
  },
  emptyMessage: {
    type: String,
    default: 'No data available.',
  },
  showDivider: {
    type: Boolean,
    default: true,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchColumns: {
    type: Array,
    default: () => null, // If null, search in all columns
  },
  filterable: {
    type: Boolean,
    default: false,
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

const currentPage = ref(1);
const searchQuery = ref('');
const activeFilters = ref([]);
const isFilterMenuOpen = ref({});

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
    const columnsToSearch = props.searchColumns || Object.keys(item);
    return columnsToSearch.some(key => {
      const value = item[key];
      return value !== null && value !== undefined && value.toString().toLowerCase().includes(lowerCaseQuery);
    });
  });
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize));

const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * props.pageSize;
  const endIndex = startIndex + props.pageSize;
  return filteredData.value.slice(startIndex, endIndex);
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

// Reset to first page when data changes
watch(filteredData, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
ion-icon {
  font-size: 16px;
}
</style>