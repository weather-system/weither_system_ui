<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import MainWrapper from '@/components/MainWrapper.vue'
import TPSB3Form from '@/components/TPSB3Form.vue';
import { getTpsB3Detail, updateTpsB3 } from '@/lib/tpsb3';
import Swal from 'sweetalert2'

const $loading = useLoading()
const router = useRouter()
const route = useRoute()

const form = ref(null)

const submit = async (data) => {
  data.items = data.items.map((v) => {
    delete v.company_tps_b3_id;
    delete v.created_at;
    delete v.updated_at;
    return v;
  });

   // Tambahkan loader untuk submit
  try {
    await updateTpsB3(route.params.id, data);
    await Swal.fire({
      title: 'Success!',
      text: 'Data berhasil diperbarui!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    router.push('/Data/TPSB3');
  } catch (e) {
    console.error(e);
    const errorMessage = e.response?.data?.message || e.message || 'Terjadi kesalahan tak terduga.';
    await Swal.fire({
      title: 'Error!',
      text: `Gagal memperbarui perizinan: ${errorMessage}`,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  } 
};

onMounted(async () => {
  const loader = $loading.show()
  try {
    const data = await getTpsB3Detail(route.params.id)
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
          <h3>Edit TPS B3</h3>
        </div>

        <TPSB3Form ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
