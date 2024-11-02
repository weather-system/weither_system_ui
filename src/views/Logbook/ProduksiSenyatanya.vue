<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { useStore } from 'vuex'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const store = useStore()

const produksiSenyatanya = ref([])

onMounted(async () => {
  const loader = $loading.show()
  try {
    // Data dummy, ganti ini dengan panggilan API Anda
    produksiSenyatanya.value = [
      {
        id: 1,
        company: 'Perusahaan A',
        month: 'Januari',
        year: 2024,
        tgl_pengambilan_contoh: '2024-01-15',
        debit_terukur: '150',
        produksi_ton_bulan: '300',
        lab_penguji: 'Lab A',
        status: 'Aktif',
      },
      {
        id: 2,
        company: 'Perusahaan B',
        month: 'Februari',
        year: 2024,
        tgl_pengambilan_contoh: '2024-02-15',
        debit_terukur: '160',
        produksi_ton_bulan: '320',
        lab_penguji: 'Lab B',
        status: 'Aktif',
      },
      // Tambahkan data dummy lainnya sesuai kebutuhan
    ]
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
        <div v-if="$loading.isLoading" class="loading-overlay">
          <!-- Tampilkan loader di sini -->
          Loading...
        </div>

        <div class="content-page-header content-page-headersplit">
          <h5>
            Produksi Senyatanya
          </h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Pengendalian/PencemaranAir/Create"
                >
                  <i class="fa fa-plus me-2"></i>Tambah
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div style="width: fit-content">
          <div class="d-flex align-items-center" style="gap: 1rem">
            <p class="m-0">Bulan</p>
            <select class="form-select">
              <option value="">Semua</option>
              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
            <p class="m-0">Tahun</p>
            <select class="form-select">
              <option>Semua</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <div class="mt-4 d-flex" style="gap: 1rem">
            <input class="form-control" placeholder="Search..." />
            <button class="btn btn-primary">Search</button>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Perusahaan</th>
                    <th>Bulan</th>
                    <th>Tanggal Input</th>
                    <th>Satuan Produksi (Ton/Bulan)</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in produksiSenyatanya" :key="data.id">
                    <td>{{ data.company }}</td>
                    <td>{{ data.month }} {{ data.year }}</td>
                    <td>{{ data.tgl_pengambilan_contoh }}</td>
                    <td>{{ data.produksi_ton_bulan }}</td>
                    <td>{{ data.status }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <button class="btn btn-success">Ubah</button>
                      <button class="btn btn-danger">Hapus</button>
                      <button class="btn btn-primary">Cetak</button>
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
