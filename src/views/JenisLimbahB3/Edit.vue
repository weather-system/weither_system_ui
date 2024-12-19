<script setup>
import { onMounted, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { useRouter, useRoute } from 'vue-router'
import MainWrapper from '@/components/MainWrapper.vue'
import JenisLimbahB3Form from '@/components/JenisLimbahB3Form.vue'
import { updateJenisLimbahB3, getJenisLimbahB3Detail } from '@/lib/jenisLimbahB3.js'

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await updateJenisLimbahB3(route.params.id, data)
    router.push('/JenisLimbahB3')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    const data = await getJenisLimbahB3Detail(route.params.id)
    form.value.setValues(data)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Buat Jenis Limbah B3</h3>
        </div>

        <JenisLimbahB3Form ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
