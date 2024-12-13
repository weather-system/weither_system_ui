<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import LogbookForm from '@/components/LogbookForm.vue';
import { getLogbookIpalDetail, updateLogbookIpal } from '@/lib/logbookipal';
import Swal from 'sweetalert2'

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async (data) => {
  delete data.unit_permissible_waste_water_discharge;
  data.items = data.items.map((v) => {
    delete v.company_tps_b3_id;
    delete v.referensi_baku_mutu_id;
    delete v.created_at;
    delete v.updated_at;
    return v;
  });
  const loader = $loading.show()
  try {
    await updateLogbookIpal(route.params.id, data);
    Swal.fire('Success!', 'Data Berhasil Diperbarui.', 'success')
    router.push('/Logbook/IPAL');
  } catch (e) {
    console.error(e);
    const errorMessage = e.response?.data?.message || e.message || 'Terjadi kesalahan tak terduga.';
    Swal.fire(
          'Error!',
          '${errorMessage}',
          'error',
        )
  } finally {
    loader.hide()
  }
};

onMounted(async () => {
  const loader = $loading.show()
  try {
    const data = await getLogbookIpalDetail(route.params.id)
    console.log(data)
    form.value.setValues(data)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Edit Data Logbook IPAL</h3>
        </div>

        <LogbookForm ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
