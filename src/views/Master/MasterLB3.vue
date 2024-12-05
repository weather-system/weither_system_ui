<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getAllForAdmin, deleteTpsB3 } from '@/lib/tpsb3'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'

const route = useRoute()

const tpsB3 = ref([])
const $loading = useLoading()

const fetchData = async () => {
  const loader = $loading.show() 
  try {
    const data = await getAllForAdmin(route.query.company_id) 
    tpsB3.value = data 
  } finally {
    loader.hide()
  }
}

const deleteData = async id => {
  try {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    })

    if (result.isConfirmed) {
      $loading.start() // Memulai loading
      await deleteTpsB3(id) // Memanggil API untuk menghapus data
      Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success')
      fetchData() // Memuat ulang data setelah penghapusan
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Gagal menghapus data TPS B3!',
      icon: 'error',
    })
  } finally {
    $loading.stop() // Menghentikan loading
  }
}

// Memanggil fungsi fetchData saat komponen dimuat
onMounted(() => {
  fetchData()
  console.log(tpsB3.value) // Memastikan data ada setelah dipanggil
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <div>
            <h3>Data TPS B3</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Pihak Ke 3</th>
                    <th>Sumber Limbah B3</th>
                    <th>Koordinat (X, Y)</th>
                    <th>Volume Limbah B3 Dalam Izin</th>
                    <th>Masa Berlaku</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tpsB3" :key="data.id">
                    <td>{{ data.pihak_ke_3 }}</td>
                    <td>{{ data.sumber_limbah_b3 }}</td>
                    <td>{{ data.koordinat_x }}, {{ data.koordinat_y }}</td>
                    <td>{{ data.volume_limbah_dalam_izin }}</td>
                    <td>{{ data.masa_berlaku }}</td>
                    <td>
                      <router-link
                        :to="`/Data/TPSB3/Edit/${data.id}`"
                        class="btn btn-primary"
                      >
                        Edit
                      </router-link>
                      <button
                        @click="deleteData(data.id)"
                        class="btn btn-primary m-2"
                      >
                        Delete
                      </button>
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
