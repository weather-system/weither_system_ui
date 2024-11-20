<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import SumberAirForm from '@/components/SumberAirForm.vue';
import { createSumberAir } from '@/lib/sumberAir';
import Swal from 'sweetalert2';
const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async (data) => {
  const loader = $loading.show()
  try {
    await createSumberAir(data)
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data Cerobong Berhasil dibuat!',
      });
    router.push('/Data/SumberAir')
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

onMounted(() => {
  if (route.query.jenis) {
    form.value.setValues({
      jenis: route.query.jenis
    })
  }
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Tambah Cerobong</h3>
        </div>

        <SumberAirForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
