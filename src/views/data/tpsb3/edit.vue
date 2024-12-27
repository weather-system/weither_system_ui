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
  data.status = 'PENDING';

  data.items = data.items.map((v) => {
    delete v.company_tps_b3_id;
    delete v.created_at;
    delete v.updated_at;
    return v;
  });
  const loader = $loading.show()
  try {
    await updateTpsB3(route.params.id, data);
    Swal.fire('Success!', 'Data Berhasil Diperbarui.', 'success')
    router.push('/Data/TPSB3');
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
    const data = await getTpsB3Detail(route.params.id)
    data.itemz=data.itemz.map((v)=>{
      delete v.created_at
      delete v.updated_at
      return v
    })
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
          <h3>Rincian Teknis LB3</h3>
        </div>

        <TPSB3Form ref="form" @submit="submit" />
      </div>
    </div>
  </MainWrapper>
</template>
