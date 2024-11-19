<script setup>
import { useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import TPSB3Form from '@/components/TPSB3Form.vue';
import { createTpsB3 } from '@/lib/tpsb3';
import Swal from 'sweetalert2'


const $loading = useLoading()
const router = useRouter()

const submit = async (data) => {
  try {
    await createTpsB3(data)
    await Swal.fire({
      title: 'Success!',
      text: 'Data berhasil ditambahkan!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/Data/TPSB3')
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
          <h3>Rincian Teknis TPS LB3</h3>
        </div>

        <TPSB3Form @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
