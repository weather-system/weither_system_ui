<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getAllCerobong, deleteCerobong } from '@/lib/cerobong.js'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'

const route = useRoute()

const $loading = useLoading()
const cerobong = ref([])

const fetchCerobong = async () => {
  const loader = $loading.show()
  try {
    const data = await getAllCerobong(route.query.company_id)
    cerobong.value = data
  } finally {
    loader.hide()
  }
}

const deleteData = async (id) => {
  const confirm = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Data yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal'
  })

  if (confirm.isConfirmed) {
    const loader = $loading.show()
    try {
      await deleteCerobong(id)
      cerobong.value = cerobong.value.filter((item) => item.id !== id)
      Swal.fire('Berhasil', 'Data berhasil dihapus', 'success')
    } catch (error) {
      Swal.fire('Error', 'Gagal menghapus data cerobong', 'error')
    } finally {
      loader.hide()
    }
  }
}

onMounted(() => {
  fetchCerobong()
})
</script>

<template>
    <MainWrapper>
      <div class="page-wrapper page-settings">
        <div class="content">
          <div class="content-page-header content-page-headersplit mb-2">
            <div>
              <h3>Data Pertek Emisi</h3>
            </div>
            <!-- <div class="list-btn">
              <ul>
                <li>
                  <router-link class="btn btn-primary" to="/Data/Cerobong/Tambah">
                     Change route as necessary
                    <i class="fa fa-plus me-2"></i>Tambah Cerobong
                  </router-link>
                </li>
              </ul>
            </div> -->
          </div>
          <div class="row">
            <div class="col-12">
              <div class="table-responsive table-div">
                <table class="table datatable">
                  <thead>
                    <tr>
                      <th>Jenis Boiler/Jumlah Boiler(Buah)</th>
                      <th>Tinggi/Diameter/Kap. Boiler</th>
                      <th>Merk Boiler</th>
                      <th>Sistem Pengendalian Emisi Cerobong</th>
                      <th>Lubang Sampling</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in cerobong" :key="data.id">
                      <td>{{ data.jenis_boiler }} ({{ data.jumlah_boiler }})</td>
                      <td>
                        T: {{ data.tinggi_cerobong }} D:
                        {{ data.diameter_cerbong }} Kap:
                        {{ data.kapasitas_boiler }}
                      </td>
                      <td>{{ data.merk_boiler }}</td>
                      <td>{{ data.pengendalian_emisi_cerobong }}</td>
                      <td>{{ data.lubang_sampling }}</td>
                      <td>
                        <router-link
                          :to="
                            data.id
                              ? `/Data/Cerobong/Edit/${data.id}`
                              : '/Data/Cerobong/Tambah'
                          "
                          class="btn btn-primary"
                          >Edit</router-link
                        >
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
