<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getTpsB3, deleteTpsB3 } from '@/lib/tpsb3';
import { getPertekData } from '@/lib/company.js'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'

const $loading = useLoading()

const tpsB3 = ref([])
const totalTpsB3 = ref(0)
const fetchData = async () => {
  const loader = $loading.show()
  try {
    tpsB3.value = await getTpsB3()
  } catch (e) {
    console.error('Error fetching data:', e)
    Swal.fire('Error', 'Gagal mengambil data pencemaran air.', 'error')
  } finally {
    loader.hide()
  }
}
const deleteData = async (id) => {
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
    await deleteTpsB3(id)
    await fetchData()
    Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    tpsB3.value = await getTpsB3()
    const pertekData = await getPertekData()
    if (pertekData) {
      totalTpsB3.value = pertekData.tpsb3_total

      const n = pertekData.tpsb3_total - tpsB3.value.length
      if (n > 0) {
        tpsB3.value = tpsB3.value.concat(Array(n).fill({
          jenis_limbah_b3: '-',
          sumber_limbah_b3: '-',
          koordinat_x: '-',
          koordinat_y: '-',
          volume: '-',
          satuan: '-',
        }))
      }
    }
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
        <div class="content-page-header content-page-headersplit mb-2">
          <div>
            <h3>Data Rintek LB3</h3>
          </div>
          <div class="list-btn">
            <ul>
              <li>
                <!-- <router-link class="btn btn-primary" to="/Data/TPSB3/Tambah">
                  <i class="fa fa-plus me-2"></i>Tambah TPS B3
                </router-link> -->
              </li>
            </ul>
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
                        :to="data.id ? `/Data/TPSB3/Edit/${data.id}` : '/Data/TPSB3/Tambah'"
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
