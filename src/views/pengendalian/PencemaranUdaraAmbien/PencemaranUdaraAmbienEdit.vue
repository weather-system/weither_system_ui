<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getPencemaranUdaraAmbienDetail, updatePencemaranUdaraAmbien } from '@/lib/pencemaranUdara.js'
import MainWrapper from '@/components/MainWrapper.vue'
import PencemaranUdaraAmbienForm from '@/components/PencemaranUdaraAmbienForm.vue'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const $loading = useLoading()

const form = ref(null)
const jenis = ref('')

// Watch for changes in route id and load data
watch(() => route.query.id, async (id) => {
  if (!id) return

  const loader = $loading.show()
  try {
    const data = await getPencemaranUdaraAmbienDetail(id)
    
    // Process the data for form
    const formData = {
      ...data,
      titik_uji: data.titik_uji.map(titik => ({
        ...titik,
        details: titik.details.map(detail => ({
          ...detail,
          hasil_pengujian1: parseFloat(detail.hasil_pengujian1)
        }))
      }))
    }

    // Set the jenis value if available
    if (data.titik_uji?.[0]?.details?.[0]?.referensi_baku_mutu_detail?.referensi_baku_mutu?.jenis) {
      jenis.value = data.titik_uji[0].details[0].referensi_baku_mutu_detail.referensi_baku_mutu.jenis
    }

    // Set form values
    form.value?.setValues(formData)
  } catch (error) {
    console.error('Error loading data:', error)
    Swal.fire({
      title: 'Error!',
      text: 'Gagal memuat data',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  } finally {
    loader.hide()
  }
}, { immediate: true })

// Handle form submission
const submit = async (data) => {
  const loader = $loading.show()
  try {
    // Clean up the data before submission
    const submitData = {
      ...data,
      titik_uji: data.titik_uji.map(titik => ({
        ...titik,
        details: titik.details.map(detail => ({
          id: detail.id,
          hasil_pengujian1: detail.hasil_pengujian1,
          referensi_baku_mutu_detail_id: detail.referensi_baku_mutu_detail_id
        }))
      }))
    }

    await updatePencemaranUdaraAmbien(route.query.id, submitData)
    
    await Swal.fire({
      title: 'Success!',
      text: 'Data berhasil diperbarui!',
      icon: 'success',
      confirmButtonText: 'OK'
    })

    router.push('/Pengendalian/PencemaranUdara?sidebar=PencemaranUdara')
  } catch (error) {
    console.error('Error updating data:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan tak terduga'
    await Swal.fire({
      title: 'Error!',
      text: `Gagal memperbarui data: ${errorMessage}`,
      icon: 'error',
      confirmButtonText: 'OK'
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
        <div class="content-page-header content-page-headersplit">
          <div>
            <h4>Form Pemantauan Pencemaran Ambien Edit</h4>
          </div>
        </div>

        <PencemaranUdaraAmbienForm 
          ref="form"
          :jenis="jenis"
          @submit="submit"
        />
      </div>
    </div>
  </MainWrapper>
</template>