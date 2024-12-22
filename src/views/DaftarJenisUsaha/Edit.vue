<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import PageHeader from '@/components/PageHeader.vue'
import DaftarJenisUsahaForm from '@/components/DaftarJenisUsahaForm.vue'
import {
  getJenisUsahaDetail,
  updateJenisUsaha,
} from '@/lib/jenisUsaha.js'

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await updateJenisUsaha(route.params.id, data)
    router.push('/w/DaftarJenisUsaha')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    const data = await getJenisUsahaDetail(route.params.id)
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
  <PageHeader>
    <h3>Tambah Jenis Usaha</h3>
  </PageHeader>
  <DaftarJenisUsahaForm ref="form" @submit="submit" />
</template>
