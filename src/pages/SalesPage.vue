<template>
  <div class="page">
    <h1>Sales</h1>
    
    <Filters 
      :filters="filters" 
      @filter="handleFilter"
    />
    
    <DataChart 
      :chart-data="chartData" 
      chart-type="pie"
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
    data: [],
    backgroundColor: [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)'
    ],
    borderWidth: 1
  }]
});

const headers = ['Id', 'Product', 'Quantity', 'Price', 'Date'];
const filters = ref([
  { name: 'product', label: 'Product Name' },
  { name: 'dateFrom', label: 'Date From', type: 'date' },
  { name: 'dateTo', label: 'Date To', type: 'date' },
  { name: 'minPrice', label: 'Min Price', type: 'number' }
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
  
  const response = await api.getSales(params);
  data.value = response.data;
  totalPages.value = Math.ceil(response.total / itemsPerPage);
  
  // Update chart data (top 5 products)
  const topProducts = [...data.value]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
  
  chartData.value.labels = topProducts.map(item => item.product);
  chartData.value.datasets[0].data = topProducts.map(item => item.quantity);
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