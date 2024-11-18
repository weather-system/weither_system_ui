<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import axios from 'axios'
import Swal from 'sweetalert2' // Ensure SweetAlert2 is imported

// Ref to store data from the API
const pencemaranUdaraData = ref([])

// Loading indicator
const $loading = useLoading()

// Function to fetch data from the backend
const getPencemaranAir = async () => {
  try {
    const response = await axios.get('/api/pencemaran-udaras') // Replace with your API endpoint
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data from API')
  }
}

// Fetch data on component mount
const fetchData = async () => {
  const loader = $loading.show()
  try {
    pencemaranUdaraData.value = await getPencemaranAir()
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran udara.', 'error')
  } finally {
    loader.hide()
  }
}

// Delete data function
const deleteData = async id => {
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
      await axios.delete(`/api/pencemaran-udaras/${id}`)
      await fetchData()
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (e) {
      console.error(e)
      Swal.fire('Error', 'Gagal menghapus data.', 'error')
    } finally {
      loader.hide()
    }
  }
}

// Fetch data when the component is mounted
onMounted(fetchData)
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div
          class="content-page-header content-page-headersplit d-flex align-items-center mb-4"
        >
          <div class="d-flex align-items-center gap-2">
            <RouterLink
              class="btn btn-primary"
              to="/Pengendalian/PencemaranUdara/TambahUdaraAmbien"
            >
              Tambah Udara Ambien
            </RouterLink>
            <RouterLink
              class="btn btn-primary"
              to="/Pengendalian/PencemaranUdara/TambahUdaraEmisi"
            >
              Tambah Udara Emisi
            </RouterLink>
            <RouterLink
              class="btn btn-primary"
              to="/Pengendalian/PencemaranUdara/TambahFlyAshBottomAshDanSludge"
            >
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
                    <th>Laporan Bulan</th>
                    <th>Tanggal Pengujian</th>
                    <th>Jenis</th>
                    <th>Laboratorium Penguji</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Loop through the data and display it in the table -->
                  <tr
                    v-for="(item, index) in pencemaranUdaraData"
                    :key="item.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.bulan }}</td>
                    <td>{{ item.tanggal_uji }}</td>
                    <td>{{ item.jenis }}</td>
                    <td>{{ item.lab_penguji }}</td>
                    <td>{{ item.status }}</td>
                    <td>
                      <!-- Action buttons -->
                      <RouterLink
                        to="/Pengendalian/PencemaranUdara/TambahUdaraAmbien"
                        class="btn btn-primary"
                        v-if="item.status == 'Verifikasi LH'"
                        >Cetak</RouterLink
                      >
                      <RouterLink
                        v-if="item.status != 'Verifikasi LH'"
                        :to="`/Pengendalian/PencemaranUdara/Edit/${item.id}`"
                        class="btn btn-success m-2"
                      >
                        Edit
                      </RouterLink>
                      <RouterLink
                        v-else-if="item.status != 'Verifikasi LH'"
                        :to="`/Pengendalian/PencemaranUdara/Edit/${item.id}`"
                        class="btn btn-success m-2"
                      >
                       Edit
                      </RouterLink>
                      <RouterLink
                        v-else-if="item.status != 'Verifikasi LH'"
                        :to="`/Pengendalian/PencemaranUdara/Edit/${item.id}`"
                        class="btn btn-success m-2"
                      >
                        Edit
                      </RouterLink>
                      <button
                        class="btn btn-danger m-2"
                        @click="deleteData(item.id)"
                        v-if="item.status != 'Verifikasi LH'"
                      >
                        Hapus
                      </button>
                      <RouterLink
                        v-if="item.jenis === 'Udara Ambien' && item.status != 'Verifikasi LH'"
                        :to="`/Pengendalian/PencemaranUdara/DetailAmbien/${item.id}`"
                        class="btn btn-warning m-2"
                      >
                        Detail
                      </RouterLink>
                      <RouterLink
                        v-else-if="item.jenis === 'Udara Emisi' && item.status != 'Verifikasi LH'"
                        :to="`/Pengendalian/PencemaranUdara/DetailEmisi/${item.id}`"
                        class="btn btn-warning m-2"
                      >
                        Detail
                      </RouterLink>
                      <RouterLink
                        v-else-if="item.jenis === 'Fly Ash, Bottom Ash, dan Sludge' && item.status != 'Verifikasi LH'"
                        :to="`/Pengendalian/PencemaranUdara/DetailFlyash/${item.id}`"
                        class="btn btn-warning m-2"
                      >
                        Detail
                      </RouterLink>
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
