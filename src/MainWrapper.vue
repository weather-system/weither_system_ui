<script setup>
import AppSidebar from "./Sidebar.vue";
import AppHeader from "./Header.vue";


// Definisikan props tanpa destructuring
defineProps({
  appheader: { type: Boolean, default: true },
  appsidebar: { type: Boolean, default: true },
});
</script>

<template>
  <div class="main-wrapper">
    <AppHeader v-if="appheader" />
    <AppSidebar v-if="appsidebar" />
    <slot></slot>
  </div>
</template>
