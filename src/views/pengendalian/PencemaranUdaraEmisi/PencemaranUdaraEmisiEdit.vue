<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getPencemaranUdaraDetail, updatePencemaranUdara } from '@/lib/pencemaranUdara.js'
import MainWrapper from '@/components/MainWrapper.vue'
import PencemaranUdaraEmisiForm from '@/components/PencemaranUdaraEmisiForm.vue'
import Swal from 'sweetalert2'
const route = useRoute()
const router = useRouter()
const $loading = useLoading()

const form = ref(null)

watch(() => route.query.id, async (latest, _) => {
  const loader = $loading.show()
  try {
    const data = await getPencemaranUdaraDetail(latest)
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
  data.details = data.details.map((v) => {
    delete v.created_at
    delete v.updated_at
    delete v.referensi_baku_mutu_detail
    delete v.parameter
    delete v.satuan
    return v
  })

  try {
    await updatePencemaranUdara(route.query.id, data)
    router.push('/Pengendalian/PencemaranUdara?sidebar=PencemaranUdara')
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
            <h4>
              Form Pemantauan Pencemaran Udara Edit
            </h4>
          </div>
        </div>

        <PencemaranUdaraEmisiForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
