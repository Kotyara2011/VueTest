<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="header in headers" :key="header">
          {{ item[header.toLowerCase()] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  headers: Array,
  data: Array
});
</script>