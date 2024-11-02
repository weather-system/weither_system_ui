<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()

const ipalData = ref([])
const selectedMonth = ref('')
const selectedYear = ref('')

// Dummy data, ganti dengan panggilan API Anda
onMounted(async () => {
  const loader = $loading.show()
  try {
    ipalData.value = [
      {
        id: 1,
        tgl_input: '2023-10-01',
        company: 'PT ALLINSTUDIO',
        sumber_limbah: 'Limbah Cair',
        inlet: 'Merah, 6.5, 15.0, 25°C',
        outlet: 'Biru, 7.0, 12.0, 22°C',
        sv30: 'Baik',
      },
      {
        id: 2,
        tgl_input: '2023-10-05',
        company: 'PT XYZ',
        sumber_limbah: 'Limbah Padat',
        inlet: 'Hijau, 5.5, 10.0, 20°C',
        outlet: 'Kuning, 6.0, 8.0, 18°C',
        sv30: 'Buruk',
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
          Loading...
        </div>

        <div class="content-page-header content-page-headersplit">
          <h5>Data IPAL</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Logbook/IPAL/Create"
                >
                  <i class="fa fa-plus me-2"></i>Tambah
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-4">
            <select class="form-select" v-model="selectedMonth">
              <option value="">Pilih Bulan</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedYear">
              <option value="">Pilih Tahun</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Tanggal Input</th>
                    <th>Perusahaan</th>
                    <th>Sumber Limbah</th>
                    <th>Inlet (Warna, pH, Debit, Suhu)</th>
                    <th>Outlet (Warna, pH, Debit, Suhu)</th>
                    <th>SV-30</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in ipalData" :key="data.id">
                    <td>{{ data.tgl_input }}</td>
                    <td>{{ data.company }}</td>
                    <td>{{ data.sumber_limbah }}</td>
                    <td>{{ data.inlet }}</td>
                    <td>{{ data.outlet }}</td>
                    <td>{{ data.sv30 }}</td>
                    <td class="d-flex" style="gap: 1rem">
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
