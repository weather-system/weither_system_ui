<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()

const dataEntries = ref([
  {
    id: 1,
    month: 'DES',
    year: '2022',
    testDate: '2022-12-08',
    sampleType: 'Udara Ambien',
    lab: 'BINALAB',
    status: 'Verifikasi LH',
  },
  // Add other entries as needed
])

const selectedYear = ref('')
const selectedMonth = ref('')

onMounted(async () => {
  const loader = $loading.show()
  try {
    // Load actual data here as needed
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
        <div v-if="$loading.isLoading" class="loading-overlay">Loading...</div>

        <!-- Align Dropdowns, Buttons, and Links on the same row -->
        <div class="content-page-header content-page-headersplit d-flex align-items-center mb-4">
          <div class="d-flex align-items-center gap-2">
            <select class="form-select" v-model="selectedYear" style="width: auto;">
              <option value="">Pilih Tahun</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>

            <select class="form-select" v-model="selectedMonth" style="width: auto;">
              <option value="">Pilih Bulan</option>
              <option value="JAN">Januari</option>
              <option value="FEB">Februari</option>
              <option value="MAR">Maret</option>
              <option value="APR">April</option>
              <option value="MEI">Mei</option>
              <option value="JUN">Juni</option>
              <option value="JUL">Juli</option>
              <option value="AUG">Agustus</option>
              <option value="SEP">September</option>
              <option value="OCT">Oktober</option>
              <option value="NOV">November</option>
              <option value="DES">Desember</option>
            </select>

            <RouterLink class="btn btn-primary" to="/Logbook/TPSLimbahB3/CreateUdaraAmbien">
              Tambah Udara Ambien
            </RouterLink>

            <RouterLink class="btn btn-primary" to="/Logbook/TPSLimbahB3/CreateUdaraEmisi">
              Tambah Udara Emisi
            </RouterLink>

            <RouterLink class="btn btn-primary" to="/Logbook/TPSLimbahB3/CreateFlyAsh">
              Tambah Fly Ash, Bottom Ash, dan Sludge
            </RouterLink>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Bulan</th>
                    <th>Tanggal Pengujian</th>
                    <th>Jenis Contoh Uji</th>
                    <th>Laboratorium Penguji</th>
                    <th>Status</th>
                    <th>Aksi/Cetak Form TTE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(entry, index) in dataEntries" :key="entry.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ entry.month }} {{ entry.year }}</td>
                    <td>{{ entry.testDate }}</td>
                    <td>{{ entry.sampleType }}</td>
                    <td>{{ entry.lab }}</td>
                    <td>{{ entry.status }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <button class="btn btn-primary">Cetak</button>
                      <button class="btn btn-success">Edit</button>
                      <button class="btn btn-danger">Hapus</button>
                    </td>
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

<style scoped>
.content-page-headersplit {
  display: flex;
  align-items: center;
}
</style>
