<template>
  <div class="pagination">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
    >
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number
});

const emit = defineEmits(['page-change']);

function changePage(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page);
  }
}
</script>