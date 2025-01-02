<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <div class="flex-grow flex p-4 dark:bg-dark-bg dots" :class="{ 'flex-col': isMobile }">
      <template v-if="isMobile">
        <!-- Mobile Layout -->
        <div class="w-full p-4">
          <CreateForm @create="createEmployee" />
        </div>

        <div class="w-full p-4">
          <div class="bg-white rounded-lg shadow-md p-6 mb-4 dark:bg-gray-800 dark:shadow-none">
            <h2 class="text-2xl font-bold mb-4 dark:text-white text-gray-900">Employees</h2>
            <div class="rounded-lg overflow-hidden">
              <StackedList
                :data="employees"
                :itemComponent="EmployeeItem"
                empty-message="No employees available."
                :searchable="true"
                :searchColumns="['name']"
                :filterable="true"
                :filterCategories="filterCategories"
                :searchQuery="sharedSearchQuery"
                :activeFilters="sharedActiveFilters"
                :currentPage="sharedCurrentPage"
                @update:searchQuery="setSharedSearchQuery"
                @update:activeFilters="setSharedActiveFilters"
                @update:currentPage="setSharedCurrentPage"
                :pageSize="sharedPageSize"
                :selectedItem="sharedSelectedItem"
                @update:selectedItem="setSharedSelectedItem"
              />
            </div>
          </div>
        </div>

        <div class="w-full p-4">
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h3 class="text-lg font-semibold mb-2 dark:text-white text-gray-900">Island Bottom Right</h3>
            <!-- Display selected employee details -->
            <div v-if="sharedSelectedItem" class="mt-4">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ sharedSelectedItem.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ sharedSelectedItem.phone }} - {{ sharedSelectedItem.division.name }} - {{ sharedSelectedItem.position }}
              </p>
              <img :src="sharedSelectedItem.image" alt="Employee Image" class="w-10 h-10 rounded-full mr-3">
            </div>
            <p v-else class="text-gray-700 dark:text-gray-300">No employee selected.</p>
          </div>
        </div>
      </template>
        <template v-else-if="isTablet">
        <!-- Tablet Layout -->
        <!-- Left half: Stacked List -->
        <div class="w-1/2 p-4">
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h2 class="text-2xl font-bold mb-4 dark:text-white text-gray-900">Employees</h2>
              <div class="rounded-lg overflow-hidden">
                  <StackedList
                      :data="employees"
                      :itemComponent="EmployeeItem"
                      empty-message="No employees available."
                      :searchable="true"
                      :searchColumns="['name']"
                      :filterable="true"
                      :filterCategories="filterCategories"
                      :searchQuery="sharedSearchQuery"
                      :activeFilters="sharedActiveFilters"
                      :currentPage="sharedCurrentPage"
                      @update:searchQuery="setSharedSearchQuery"
                      @update:activeFilters="setSharedActiveFilters"
                      @update:currentPage="setSharedCurrentPage"
                      :pageSize="sharedPageSize"
                      :selectedItem="sharedSelectedItem"
                      @update:selectedItem="setSharedSelectedItem"
                    />
             </div>
           </div>
        </div>
           <!-- Right half: Islands -->
        <div class="w-1/2 flex flex-col p-4 space-y-4">
          <!-- Top right island -->
          <div class="w-full p-4">
            <CreateForm @create="createEmployee" />
          </div>

          <!-- Bottom right island -->
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h3 class="text-lg font-semibold mb-2 dark:text-white text-gray-900">Island Bottom Right</h3>
            <!-- Display selected employee details -->
            <div v-if="sharedSelectedItem" class="mt-4">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ sharedSelectedItem.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ sharedSelectedItem.phone }} - {{ sharedSelectedItem.division.name }} - {{ sharedSelectedItem.position }}
              </p>
              <img :src="sharedSelectedItem.image" alt="Employee Image" class="w-10 h-10 rounded-full mr-3">
            </div>
            <p v-else class="text-gray-700 dark:text-gray-300">No employee selected.</p>
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
              <DataTable 
                :data="employees"
                :columns="columns"
                :searchColumns="['name']"
                :filterableColumns="['division']"
                :filterCategories="filterCategories"
                :searchQuery="sharedSearchQuery"
                :activeFilters="sharedActiveFilters"
                :currentPage="sharedCurrentPage"
                @update:searchQuery="setSharedSearchQuery"
                @update:activeFilters="setSharedActiveFilters"
                @update:currentPage="setSharedCurrentPage"
                :pageSize="sharedPageSize"
                :selectedItem="sharedSelectedItem"
                @update:selectedItem="setSharedSelectedItem"
              >
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
          <div class="w-full p-4">
            <CreateForm @create="createEmployee" />
          </div>

          <!-- Bottom right island -->
          <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:shadow-none">
            <h3 class="text-lg font-semibold mb-2 dark:text-white text-gray-900">Island Bottom Right</h3>
            <!-- Display selected employee details -->
            <div v-if="sharedSelectedItem" class="mt-4">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ sharedSelectedItem.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ sharedSelectedItem.phone }} - {{ sharedSelectedItem.division.name }} - {{ sharedSelectedItem.position }}
              </p>
              <img :src="sharedSelectedItem.image" alt="Employee Image" class="w-10 h-10 rounded-full mr-3">
            </div>
            <p v-else class="text-gray-700 dark:text-gray-300">No employee selected.</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, watch, computed } from 'vue';
import Navbar from '../components/layout/Navbar.vue';
import DataTable from '../components/common/DataTable.vue';
import StackedList from '../components/common/StackedList.vue';
import EmployeeItem from '../components/EmployeeItem.vue';
import CreateForm from '../components/CreateForm.vue';
import employeesData from '../assets/employees.json';
import { useLocalStorage } from '../services/localStorageService';

const { getItem, setItem, removeItem } = useLocalStorage();

const isMobile = ref(window.innerWidth < 1024);
const isTablet = ref(window.innerWidth >= 1024 && window.innerWidth < 1636);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024;
  isTablet.value = window.innerWidth >= 1024 && window.innerWidth < 1636
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

const filterCategories = {
  division: {
    categories: ['Mobile Apps', 'QA', 'Full Stack', 'Backend', 'Frontend', 'UI/UX Designer'],
    key: 'division.name'
  },
};

// Shared State (using reactive for easier updates)
const sharedState = reactive({
  searchQuery: '',
  activeFilters: [],
  currentPage: 1,
  pageSize: 5,
  selectedItem: null
});

// Separate employees state
const employees = ref([]);

// Load initial state from localStorage or use default values
const storedState = getItem('crudState');
const storedEmployees = getItem('employees');

if (storedEmployees) {
    employees.value = storedEmployees;
} else {
    employees.value = employeesData;
}

if (storedState) {
  Object.assign(sharedState, storedState);
}

// Set the default selected item if it doesn't exist
if (!sharedState.selectedItem && employees.value.length > 0) {
  sharedState.selectedItem = employees.value[0];
}

// Watch for changes in sharedState and update localStorage
watch(sharedState, (newSharedState) => {
    setItem('crudState', newSharedState);
}, { deep: true });

watch(employees, (newEmployees) => {
    setItem('employees', newEmployees);
}, { deep: true });

// Expose shared state variables and update functions to the template
const sharedSearchQuery = computed(() => sharedState.searchQuery);
const sharedActiveFilters = computed(() => sharedState.activeFilters);
const sharedCurrentPage = computed(() => sharedState.currentPage);
const sharedPageSize = computed(() => sharedState.pageSize);
const sharedSelectedItem = computed(() => sharedState.selectedItem)

const setSharedSearchQuery = (value) => {
  console.log('Setting shared search query:', value);
  sharedState.searchQuery = value;
  sharedState.currentPage = 1; // Reset to page 1 when search query changes
};

const setSharedActiveFilters = (value) => {
  console.log('Setting shared active filters:', value);
  sharedState.activeFilters = value;
  sharedState.currentPage = 1; // Reset to page 1 when filters change
};

const setSharedCurrentPage = (value) => {
  console.log('Setting shared current page:', value);
  sharedState.currentPage = value;
};

const setSharedSelectedItem = (item) => {
  console.log('Setting shared selected item:', item);
  sharedState.selectedItem = item;
}

const createEmployee = (newEmployee) => {
  console.log('Creating employee:', newEmployee);
  employees.value.push(newEmployee);
};
</script>

<style scoped>

</style>