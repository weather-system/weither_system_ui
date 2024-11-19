<script setup>
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import CerobongForm from '@/components/CerobongForm.vue';
import { createCerobong } from '@/lib/cerobong';
import Swal from 'sweetalert2'
const $loading = useLoading()
const router = useRouter()

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await createCerobong(data)
     Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data Cerobong Berhasil dibuat!',
      });
    router.push('/Data/Cerobong')
  } catch (e) {
    console.error(e)
    await Swal.fire({
      title: 'Error!',
      text: 'Gagal menambahkan Data.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
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
          <h3>Tambah Cerobong</h3>
        </div>

        <CerobongForm @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
