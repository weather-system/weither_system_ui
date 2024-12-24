<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import * as Sentry from "@sentry/vue";
import PageHeader from '@/components/PageHeader.vue'
import ReferensiBakuMutuForm from '@/components/ReferensiBakuMutuForm.vue'
import { createReferensiBakuMutu, validateReferensiBakuMutuDetails } from '@/lib/referensiBakuMutu.js'

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

  let error = null
  if (data.jenis == 'Limbah Integrasi') {
    error = validateReferensiBakuMutuDetails(data.details)
  }

  if (error) {
    Swal.fire('Error', error, 'error');
    return
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
    Swal.fire({
      title: 'Success',
      text: 'Data berhasil disimpan.',
      icon: 'success',
      confirmButtonText: 'Oke',
    })
    router.push({ path: '/w/ReferensiBakuMutu', query: route.query })
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <PageHeader>
    <h3>Buat Referensi Baku Mutu</h3>
  </PageHeader>

  <ReferensiBakuMutuForm ref="form" @submit="submit" />
</template>
