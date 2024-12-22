<script setup>
import { RouterView } from 'vue-router'
import MainWrapper from '@/components/MainWrapper.vue'
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <RouterView />
      </div>
    </div>
  </MainWrapper>
</template>
