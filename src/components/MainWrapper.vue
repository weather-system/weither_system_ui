<script setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const { header = true, sidebar = true } = defineProps(['header', 'sidebar'])
</script>

<template>
  <div class="main-wrapper">
    <Header v-if="header" />
    <Sidebar v-if="sidebar" />
    <slot></slot>
  </div>
</template>
