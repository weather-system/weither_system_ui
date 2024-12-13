<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import { getPengelolaanLimbahB3, deletePengelolaanLimbahB3, getStatusPertek } from '@/lib/pengelolaanLimbahB3.js'
import MainWrapper from '@/components/MainWrapper.vue'
import { useStore } from 'vuex'

const isUserIpalPending = ref(false)
const $loading = useLoading()
const dataEntries = ref([])
const statuspertek = ref([])
const selectedYear = ref('')
const store = useStore()

const filteredDataEntries = computed(() => {
  if (!selectedYear.value) return dataEntries.value;
  return dataEntries.value.filter(entry => entry.tahun === selectedYear.value);
});



onMounted(async () => {
  const loader = $loading.show()
  try {
    statuspertek.value = await getStatusPertek()
    if (statuspertek.value?.company_tps_b3_s?.includes('PENDING')) {
      isUserIpalPending.value = true
    }
    if (isUserIpalPending.value) {
    Swal.fire({
      title: 'Warning!',
      text: 'Rintek LB3 Anda Statusnya Pending.',
      icon: 'warning',
    });
  }
    const response = await getPengelolaanLimbahB3()
    dataEntries.value = response
    console.log(dataEntries.value)
  } catch (e) {
    console.error('Gagal memuat data:', e)
  } finally {
    loader.hide()
  }
})

const deleteEntry = async (id) => {
  const confirmDelete = await Swal.fire({
    title: 'Hapus Data?',
    text: 'Apakah Anda yakin ingin menghapus data ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal',
  });

  if (!confirmDelete.isConfirmed) return;

  const loader = $loading.show();
  try {
    await deletePengelolaanLimbahB3(id);
    dataEntries.value = dataEntries.value.filter(entry => entry.id !== id);
    Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');
  } catch (error) {
    Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
    console.error('Delete error:', error);
  } finally {
    loader.hide();
  }
};

</script>

<template>
  <MainWrapper>
    <div class="" v-if="isUserIpalPending"></div>
    <div class="page-wrapper page-settings" v-if="!isUserIpalPending">
      <div class="content">
        
        <div class="content-page-header content-page-headersplit">
          <h4>
            Pemantauan Pengelolaan Limbah B3 ({{
              store.state.auth.user.company?.name
            }})
          </h4>
        </div>
        <div class="content-page-header d-flex align-items-center mb-4">
            <div class="col-md-12 d-flex justify-content-start">
              <ul>
                <li>
                  <RouterLink class="btn btn-primary" to="/Pengendalian/PengelolaanLimbahB3/PengelolaanLimbahB3Create">
                    <i class="fa fa-plus me-2"></i>Tambah Pemantauan
                  </RouterLink>
                </li>
              </ul>
            </div>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Tahun</th>
                <th>Triwulan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredDataEntries.length === 0">
                <td colspan="5" class="text-center">Tidak ada data tersedia</td>
              </tr>
              <tr v-for="entry in filteredDataEntries" :key="entry.id">
                <td>{{ entry.tahun }}</td>
                <td>{{ entry.triwulan }}</td>
                <td>{{ entry.status }}</td>
                <td>
                  <div class="d-flex gap-2">
                    <RouterLink
                      :to="{ name: 'PengendalianPengelolaanLimbahB3Edit', params: { id: entry.id } }"
                      class="btn btn-primary"
                    >
                      Edit
                    </RouterLink>
                    <button class="btn btn-primary" @click="deleteEntry(entry.id)">Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
