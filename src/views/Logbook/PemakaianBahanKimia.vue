<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { useStore } from 'vuex'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const store = useStore()

const pemakaianBahanKimia = ref([])

onMounted(async () => {
  const loader = $loading.show()
  try {
    // Dummy data, replace this with your API call
    pemakaianBahanKimia.value = [
      {
        id: 1,
        company: 'PT ALLINSTUDIO',
        month: 'Juli',
        year: 2021,
        status: 'Ajukan Baru',
        tgl_input: '2023-03-01 14:58:32',
        tgl_verifikasi: '', // Jika tidak ada verifikasi, biarkan kosong
      },
      {
        id: 2,
        company: 'PT XYZ',
        month: 'Agustus',
        year: 2021,
        status: 'Verifikasi',
        tgl_input: '2023-02-28 10:20:15',
        tgl_verifikasi: '2023-03-01 12:30:00',
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
          <h5>Pemakaian Bahan Kimia</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Logbook/PemakaianBahanKimia/Create"
                >
                  <i class="fa fa-plus me-2"></i>Tambah
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div style="width: fit-content">
          <div class="d-flex align-items-center" style="gap: 1rem">
            <p class="m-0">Tahun</p>
            <select class="form-select">
              <option value="">Semua</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
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
            <p class="m-0">Status</p>
            <select class="form-select">
              <option value="">Semua</option>
              <option value="Ajukan Baru">Ajukan Baru</option>
              <option value="Verifikasi">Verifikasi</option>
            </select>
            <button class="btn btn-primary">Cari</button>
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
                    <th>Status</th>
                    <th>Tanggal Input</th>
                    <th>Tanggal Verifikasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in pemakaianBahanKimia" :key="data.id">
                    <td>{{ data.company }}</td>
                    <td>{{ data.month }} {{ data.year }}</td>
                    <td>{{ data.status }}</td>
                    <td>{{ data.tgl_input }}</td>
                    <td>{{ data.tgl_verifikasi || 'Belum Diverifikasi' }}</td>
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
