<script setup>
import { useLoading } from 'vue-loading-overlay'
import { useRouter } from 'vue-router'
import MainWrapper from '@/components/MainWrapper.vue'
import JenisLimbahB3Form from '@/components/JenisLimbahB3Form.vue'
import { createJenisLimbahB3 } from '@/lib/jenisLimbahB3.js'

const $loading = useLoading()
const router = useRouter()

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await createJenisLimbahB3(data)
    router.push('/JenisLimbahB3')
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
          <h3>Buat Jenis Limbah B3</h3>
        </div>

        <JenisLimbahB3Form ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
