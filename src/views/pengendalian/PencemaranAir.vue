<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { useStore } from 'vuex'
import { getPencemaranAir, deletePencemaranAir } from '@/lib/pencemaranAir.js'
import MainWrapper from '@/components/MainWrapper.vue' // Import MainWrapper
import Swal from 'sweetalert2'
const $loading = useLoading()
const store = useStore()
const router = useRouter()

const pencemaranAir = ref([])
const fetchData = async () => {
  const loader = $loading.show()
  try {
    pencemaranAir.value = await getPencemaranAir()
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran air.', 'error')
  } finally {
    loader.hide()
  }
}

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
      await deletePencemaranAir(id)
      await fetchData() 
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (e) {
      console.error(e)
    } finally {
      loader.hide()
    }
  }
}
onMounted(fetchData)
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>
            Pengendalian Pencemaran Air ({{
              store.state.auth.user.company?.name
            }})
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
            <p class="m-0">Tahun/Bulan</p>
            <select class="form-select">
              <option>Semua</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <select class="form-select">
              <option>Semua</option>
              <option>Januari</option>
              <option>Febuari</option>
            </select>
          </div>

          <div class="mt-4 d-flex" style="gap: 1rem">
            <input class="form-control" placeholder="Search..." />
            <button class="btn btn-primary">Search</button>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Bulan</th>
                    <th>Tanggal Ukur</th>
                    <th>Debit Terukur (M3/BLN)</th>
                    <th>Produksi</th>
                    <th>Lab. Pengukur</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in pencemaranAir" :key="data.id">
                    <td>{{ data.month }} {{ data.year }}</td>
                    <td>{{ data.tgl_pengambilan_contoh }}</td>
                    <td>{{ data.debit_terukur }}</td>
                    <td>{{ data.produksi_ton_bulan }}</td>
                    <td>{{ data.lab_penguji }}</td>
                    <td>{{ data.status }}</td>
                    <td class="d-flex" style="gap: 1rem">
                      <RouterLink
                        :to="{
                          path: '/Pengendalian/PencemaranAir/Edit',
                          query: { id: data.id },
                        }"
                        class="btn btn-success"
                        >Ubah</RouterLink
                      >
                      <button
                        @click="deleteData(data.id)"
                        class="btn btn-danger"
                      >
                        Hapus
                      </button>
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
