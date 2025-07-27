<template>
  <div class="filters">
    <div v-for="filter in filters" :key="filter.name">
      <label :for="filter.name">{{ filter.label }}</label>
      <input 
        :type="filter.type || 'text'"
        :id="filter.name"
        v-model="filterValues[filter.name]"
        @input="applyFilters"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  filters: Array
});

const emit = defineEmits(['filter']);

const filterValues = ref({});

function applyFilters() {
  emit('filter', filterValues.value);
}
</script>