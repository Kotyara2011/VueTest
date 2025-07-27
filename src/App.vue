<template>
  <nav>
    <router-link to="/incomes">Incomes</router-link>
    <router-link to="/orders">Orders</router-link>
    <router-link to="/sales">Sales</router-link>
    <router-link to="/stocks">Stocks</router-link>
  </nav>
  <router-view></router-view>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f0f0f0;
}
nav a {
  text-decoration: none;
  color: #333;
}
nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>