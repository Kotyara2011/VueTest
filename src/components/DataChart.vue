<template>
  <canvas ref="chart"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  chartData: Object,
  chartType: {
    type: String,
    default: 'bar'
  },
  chartOptions: {
    type: Object,
    default: () => ({})
  }
});

const chart = ref(null);
let chartInstance = null;

onMounted(() => {
  renderChart();
});

watch(() => props.chartData, () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  renderChart();
}, { deep: true });

function renderChart() {
  if (chart.value) {
    chartInstance = new Chart(chart.value, {
      type: props.chartType,
      data: props.chartData,
      options: props.chartOptions
    });
  }
}
</script>