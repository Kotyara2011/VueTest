<template>
  <div class="page">
    <h1>Incomes</h1>
    
    <Filters 
      :filters="filters" 
      @filter="handleFilter"
    />
    
    <DataChart 
      :chart-data="chartData" 
      chart-type="line"
    />
    
    <DataTable 
      :headers="headers" 
      :data="data"
    />
    
    <Pagination 
      :current-page="currentPage" 
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/api';
import DataChart from '@/components/DataChart.vue';
import DataTable from '@/components/DataTable.vue';
import Filters from '@/components/Filters.vue';
import Pagination from '@/components/Pagination.vue';

const route = useRoute();
const router = useRouter();

const data = ref([]);
const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Income Amount',
    data: [],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
});

const filters = ref([
  { name: 'dateFrom', label: 'Date From', type: 'date' },
  { name: 'dateTo', label: 'Date To', type: 'date' },
  { name: 'amountMin', label: 'Min Amount', type: 'number' }
]);

const filterValues = ref({});
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(1);

async function fetchData() {
  const params = {
    ...filterValues.value,
    page: currentPage.value,
    limit: itemsPerPage
  };
  
  const response = await api.getIncomes(params);
  data.value = response.data;
  totalPages.value = Math.ceil(response.total / itemsPerPage);
  
  // Update chart data
  chartData.value.labels = data.value.map(item => new Date(item.date).toLocaleDateString());
  chartData.value.datasets[0].data = data.value.map(item => item.amount);
}

function handleFilter(filters) {
  filterValues.value = filters;
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page) {
  currentPage.value = page;
  fetchData();
}

onMounted(() => {
  fetchData();
});

// Update page when route changes
watch(() => route.query.page, (newPage) => {
  if (newPage) {
    currentPage.value = parseInt(newPage);
    fetchData();
  }
}, { immediate: true });

// Update URL when page changes
watch(currentPage, (newPage) => {
  router.push({ query: { page: newPage } });
});
</script>

<style scoped>
.page {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>