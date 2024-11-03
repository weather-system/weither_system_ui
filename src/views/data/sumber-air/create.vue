<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import SumberAirForm from '@/components/SumberAirForm.vue';
import { createSumberAir } from '@/lib/sumberAir';

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

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

onMounted(() => {
  if (route.query.jenis) {
    form.value.setValues({
      jenis: route.query.jenis
    })
  }
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Tambah Cerobong</h3>
        </div>

        <SumberAirForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
