<template>
  <div class="page">
    <h1>Orders</h1>
    
    <Filters 
      :filters="filters" 
      @filter="handleFilter"
    />
    
    <DataChart 
      :chart-data="chartData" 
      chart-type="bar"
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
import { ref, onMounted } from 'vue';
import api from '@/api/api';
import DataChart from '@/components/DataChart.vue';
import DataTable from '@/components/DataTable.vue';
import Filters from '@/components/Filters.vue';
import Pagination from '@/components/Pagination.vue';

const data = ref([]);
const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Order Value',
    data: [],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
});

const headers = ['Id', 'Customer', 'Date', 'Amount', 'Status'];
const filters = ref([
  { name: 'customer', label: 'Customer Name' },
  { name: 'status', label: 'Order Status' },
  { name: 'dateFrom', label: 'Date From', type: 'date' },
  { name: 'dateTo', label: 'Date To', type: 'date' }
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
  
  const response = await api.getOrders(params);
  data.value = response.data;
  totalPages.value = Math.ceil(response.total / itemsPerPage);
  
  // Update chart data
  chartData.value.labels = data.value.map(item => item.customer);
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
</script>