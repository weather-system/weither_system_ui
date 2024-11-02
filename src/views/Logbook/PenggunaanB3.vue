<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()

const penggunaanB3Data = ref([])
const selectedMonth = ref('')
const inputYear = ref('')

onMounted(async () => {
  const loader = $loading.show()
  try {
    // Dummy data, ganti dengan panggilan API Anda
    penggunaanB3Data.value = [
      {
        id: 1,
        company: 'PT ALLINSTUDIO',
        month: 'Juli',
        year: 2021,
        satuan_penggunaan_b3: '50.00',
        tgl_input: '2023-11-20 08:30:00',
        status: 'Tersedia',
      },
      {
        id: 2,
        company: 'PT XYZ',
        month: 'Agustus',
        year: 2021,
        satuan_penggunaan_b3: '30.00',
        tgl_input: '2023-11-25 14:15:00',
        status: 'Tidak Tersedia',
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
          <h5>Penggunaan Bahan Berbahaya dan Beracun (B3)</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Logbook/PenggunaanB3/Create"
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
            <input
              type="number"
              class="form-control"
              placeholder="Input Tahun"
              v-model="inputYear"
            />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Perusahaan</th>
                    <th>Bulan</th>
                    <th>Tahun</th>
                    <th>Satuan Penggunaan B3</th>
                    <th>Tanggal Input</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in penggunaanB3Data" :key="data.id">
                    <td>{{ data.company }}</td>
                    <td>{{ data.month }}</td>
                    <td>{{ data.year }}</td>
                    <td>{{ data.satuan_penggunaan_b3 }}</td>
                    <td>{{ data.tgl_input }}</td>
                    <td>{{ data.status }}</td>
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
