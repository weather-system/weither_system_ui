<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { getTpsB3Detail, updateTpsB3 } from '@/lib/tpslimbahb3.js'
import MainWrapper from '@/components/MainWrapper.vue'
import TPSLimbahB3Form from '@/components/TPSLimbahB3Form.vue';
import Swal from 'sweetalert2'
const route = useRoute()
const router = useRouter()
const $loading = useLoading()

const form = ref(null)
const jenis = ref('');

watch(() => route.query.id, async (latest, _) => {
  const loader = $loading.show()
  try {
    const data = await getTpsB3Detail(latest)
    delete data.id
    delete data.created_at
    delete data.updated_at
    jenis.value = data.jenis
    form.value.setValues(data)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}, { immediate: true })

const submit = async (data) => {

  try {
    await updateTpsB3(route.query.id, data)
    router.push('/logbook/TPSLimbahB3?sidebar=logbooklb3')
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
              Form Pemantauan Pencemaran Air Edit
            </h4>
          </div>
        </div>

        <TPSLimbahB3Form :jenis="jenis" ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
