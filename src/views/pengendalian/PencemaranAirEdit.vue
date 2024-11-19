<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getPencemaranAirDetail, updatePencemaranAir } from '@/lib/pencemaranAir.js'
import MainWrapper from '@/components/MainWrapper.vue'
import PencemaranAirForm from '@/components/PencemaranAirForm.vue'
import Swal from 'sweetalert2'
const route = useRoute()
const router = useRouter()
const $loading = useLoading()

const form = ref(null)

watch(() => route.query.id, async (latest, _) => {
  const loader = $loading.show()
  try {
    const data = await getPencemaranAirDetail(latest)
    delete data.id
    delete data.created_at
    delete data.updated_at
    form.value.setValues(data)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}, { immediate: true })

const submit = async (data) => {
  try {
    await updatePencemaranAir(route.query.id, data)
    router.push('/Pengendalian/PencemaranAir')
    await Swal.fire({
      title: 'Success!',
      text: 'Data berhasil diperbarui!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  } catch (e) {
    console.error(e)
    const errorMessage = e.response?.data?.message || e.message || 'Terjadi kesalahan tak terduga.';
    await Swal.fire({
      title: 'Error!',
      text: `Gagal memperbarui perizinan: ${errorMessage}`,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <div>
            <h5>
              Form Swapantau Pengendalian Pencemaran Air Edit
            </h5>
            <p>Usaha dan/atau Kegiatan : Industri Tekstil (Q<=100 m3/hari)</p>
          </div>
        </div>

        <PencemaranAirForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
