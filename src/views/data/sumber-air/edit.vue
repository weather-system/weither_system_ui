<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import SumberAirForm from '@/components/SumberAirForm.vue';
import { getSumberAirDetail, updateSumberAir } from '@/lib/sumberAir';

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await updateSumberAir(route.params.id, data)
    router.push('/Data/SumberAir')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    const data = await getSumberAirDetail(route.params.id) 
    form.value.setValues(data)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Edit Sumber Air</h3>
        </div>

        <SumberAirForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
