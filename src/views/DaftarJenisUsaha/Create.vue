<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import PageHeader from '@/components/PageHeader.vue'
import DaftarJenisUsahaForm from '@/components/DaftarJenisUsahaForm.vue'
import { createJenisUsaha } from '@/lib/jenisUsaha.js'

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await createJenisUsaha(data)
    router.push('/w/DaftarJenisUsaha')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <PageHeader>
    <h3>Tambah Jenis Usaha</h3>
  </PageHeader>
  <DaftarJenisUsahaForm @submit="submit" />
</template>
