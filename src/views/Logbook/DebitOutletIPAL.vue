<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()

const debitOutletIPAL = ref([])
const inputYear = ref('')
const selectedMonth = ref('')

// Dummy data, ganti dengan panggilan API Anda
const months = [
  { value: 'Januari', text: 'Januari' },
  { value: 'Februari', text: 'Februari' },
  { value: 'Maret', text: 'Maret' },
  { value: 'April', text: 'April' },
  { value: 'Mei', text: 'Mei' },
  { value: 'Juni', text: 'Juni' },
  { value: 'Juli', text: 'Juli' },
  { value: 'Agustus', text: 'Agustus' },
  { value: 'September', text: 'September' },
  { value: 'Oktober', text: 'Oktober' },
  { value: 'November', text: 'November' },
  { value: 'Desember', text: 'Desember' },
]

onMounted(async () => {
  const loader = $loading.show()
  try {
    debitOutletIPAL.value = [
      {
        id: 1,
        company: 'PT ALLINSTUDIO',
        month: 'Juli',
        year: 2021,
        satuan_debit_outlet: '30.00',
        tgl_input: '2019-11-20 14:29:52',
        status: 'Verifikasi LH',
      },
      {
        id: 2,
        company: 'PT XYZ',
        month: 'Agustus',
        year: 2021,
        satuan_debit_outlet: '25.00',
        tgl_input: '2019-11-25 10:15:30',
        status: 'Ajukan Baru',
      },
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
          <h5>Debit Outlet IPAL</h5>
          <div class="list-btn">
            <ul>
              <li>
                <RouterLink
                  class="btn btn-primary"
                  to="/Logbook/DebitOutletIPAL/Create"
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
              <option v-for="month in months" :key="month.value" :value="month.value">{{ month.text }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="Input Tahun"
              v-model="inputYear"
            />
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-2">
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
                    <th>Tahun</th>
                    <th>Satuan Debit Outlet IPAL</th>
                    <th>Tanggal Input</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in debitOutletIPAL" :key="data.id">
                    <td>{{ data.company }}</td>
                    <td>{{ data.month }}</td>
                    <td>{{ data.year }}</td>
                    <td>{{ data.satuan_debit_outlet }}</td>
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
