<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import MainWrapper from '@/components/MainWrapper.vue'
import ReferensiBakuMutuForm from '@/components/ReferensiBakuMutuForm.vue'
import {
  getReferensiBakuMutuDetail,
  updateReferensiBakuMutu,
} from '@/lib/referensiBakuMutu.js'

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async data => {
  const detailMap = {
    id: null,
    parameter: null,
    baku_mutu: null,
    sistem_pengukuran: null,
    satuan: null,
    tingkat_kebisingan: null,
    kadar_maksimum: null,
  }
  data.details = data.details.map(d => {
    delete d.created_at
    delete d.updated_at
    if (!d.id) {
      d.id = null
    }
    return {
      ...detailMap,
      ...d,
    }
  })
  const loader = $loading.show()
  try {
    await updateReferensiBakuMutu(route.params.id, data)
    router.push('/ReferensiBakuMutu')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    const data = await getReferensiBakuMutuDetail(route.params.id)
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
          <h3>Edit Referensi Baku Mutu</h3>
        </div>

        <ReferensiBakuMutuForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
