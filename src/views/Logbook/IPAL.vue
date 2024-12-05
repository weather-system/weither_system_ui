<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { useLoading } from 'vue-loading-overlay';
import { getLogbookIpal, deleteLogbookIpal } from '@/lib/logbookipal';
import MainWrapper from '@/components/MainWrapper.vue';
import Swal from 'sweetalert2';

const $loading = useLoading();
const ipalData = ref([]);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
const fetchData = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get('/api/logbookipal');
    ipalData.value = response.data.map((item) => ({
      ...item,
      formatted_date: formatDate(item.created_at), 
    }));
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran air.', 'error')
  } finally {
    loader.hide()
  }
}
const deleteData = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: 'Apa kamu yakin ?',
    text: 'Kamu tidak akan bisa mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
    },
    buttonsStyling: false,
  })

  if (isConfirmed) {
    const loader = $loading.show()
  try {
    await deleteLogbookIpal(id)
    await fetchData()
    Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
}
onMounted(async () => {
  const loader = $loading.show();
  try {
    const response = await axios.get('/api/logbookipal');
    ipalData.value = response.data.map((item) => ({
      ...item,
      formatted_date: formatDate(item.created_at), 
    }));
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    loader.hide();
  }
});
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">

        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Data Logbook IPAL</h3>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Logbook/IPAL/IPALCreate"
                >
                  <i class="fa fa-plus me-3"></i>Tambah
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Tanggal Input</th>
                    <th>Sumber Limbah</th>
                    <th>Inlet (Warna, pH)</th>
                    <th>Inlet (Debit, Suhu)</th>
                    <th>Outlet (Warna, pH)</th>
                    <th>Outlet (Debit, Suhu)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="ipalData.length > 0" v-for="data in ipalData" :key="data.id">
                    <td>{{ data.formatted_date }}</td>
                    <td>{{ data.company_ipal.type }}</td>
                    <td>{{ data.warna_inlet }}, {{ data.ph_inlet }}</td>
                    <td>{{ data.debit_inlet }}, {{ data.suhu_inlet }}</td>
                    <td>{{ data.warna_outlet }}, {{ data.ph_outlet }}</td>
                    <td>{{ data.debit_outlet }}, {{ data.suhu_outlet }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <router-link
                        :to="data.id ? `/Logbook/IPAL/IPALEdit/${data.id}` : '/Logbook/IPAL/IPALCreate'"
                        class="btn btn-primary"
                        >Edit</router-link
                      >
                      <button
                        @click="deleteData(data.id)"
                        class="btn btn-primary"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr v-else>
                    <td colspan="7" class="text-center">Tidak ada data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
