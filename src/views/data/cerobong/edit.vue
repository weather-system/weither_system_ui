<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import CerobongForm from '@/components/CerobongForm.vue';
import { getCerobongDetail, updateCerobong } from '@/lib/cerobong';

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await updateCerobong(route.params.id, data)
    router.push('/Data/Cerobong')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    const data = await getCerobongDetail(route.params.id) 
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
          <h3>Edit Cerobong</h3>
        </div>

        <CerobongForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
