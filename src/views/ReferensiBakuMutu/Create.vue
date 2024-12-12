<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import MainWrapper from '@/components/MainWrapper.vue'
import ReferensiBakuMutuForm from '@/components/ReferensiBakuMutuForm.vue'
import { createReferensiBakuMutu } from '@/lib/referensiBakuMutu.js'

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async data => {
  if (data.jenis == 'Udara Emisi') {
    data.details = [
      ...data.details,
      ...data.details1,
      ...data.details2,
      ...data.details3,
      ...data.details4,
      ...data.details5,
      ...data.details6,
    ]
  }

  delete data.details1
  delete data.details2
  delete data.details3
  delete data.details4
  delete data.details5
  delete data.details6

  const loader = $loading.show()
  try {
    await createReferensiBakuMutu(data)
    router.push('/ReferensiBakuMutu')
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
          <h3>Buat Referensi Baku Mutu</h3>
        </div>

        <ReferensiBakuMutuForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
