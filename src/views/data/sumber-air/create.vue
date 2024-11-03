<script setup>
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import SumberAirForm from '@/components/SumberAirForm.vue';
import { createSumberAir } from '@/lib/sumberAir';

const $loading = useLoading()
const router = useRouter()

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await createSumberAir(data)
    router.push('/Data/SumberAir')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Tambah Cerobong</h3>
        </div>

        <SumberAirForm @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
