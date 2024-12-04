<script setup>
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import LogbookForm from '@/components/LogbookForm.vue';
import { createLogbookIpal } from '@/lib/logbookipal';
import Swal from 'sweetalert2'


const $loading = useLoading()
const router = useRouter()

const submit = async (data) => {
  try {
    await createLogbookIpal(data)
    await Swal.fire({
      title: 'Success!',
      text: 'Data berhasil ditambahkan!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/Logbook/IPAL')
  } catch (e) {
    console.error(e)
    await Swal.fire({
      title: 'Error!',
      text: 'Gagal menambahkan Data.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Data Logbook IPAL</h3>
        </div>

        <LogbookForm @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
