<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { getSumberAir, deleteSumberAir } from '@/lib/sumberAir';
import { getPertekData } from '@/lib/company.js'

const $loading = useLoading()

const sumberAir = ref([])
const totalSumberAir = ref(0)

const deleteData = async (id) => {
  const loader = $loading.show()
  try {
    await deleteSumberAir(id)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const filterPertekSumberAir = (sumberAir, pertekSumberAir) => {
  const temp = sumberAir.map((obj) => obj.jenis)
  const filteredArray = pertekSumberAir.filter(v => !temp.includes(v));
  console.log(filteredArray)
  return filteredArray
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    sumberAir.value = await getSumberAir()
    const pertekData = await getPertekData()
    if (pertekData) {
      const filteredPertekSumberAir = filterPertekSumberAir(sumberAir.value, pertekData.sumber_air)
      sumberAir.value = sumberAir.value.concat(filteredPertekSumberAir.map((v) => {
        return {
          jenis: v,
          nama: '-',
          kedalaman: '-',
          kapasitas: '-',
          debit_dalam_izin: '-',
          koordinat_x: '-',
          koordinat_y: '-',
        }
      }))

      totalSumberAir.value = pertekData.sumber_air.length
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
            <h3>Data Sumber Air</h3>
            <p>Anda memasukan jumlah sumber air sebanyak {{ totalSumberAir }}</p>
          </div>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="/Data/SumberAir/Tambah">
                  <!-- Change route as necessary -->
                  <i class="fa fa-plus me-2"></i>Tambah Sumber Air
                </router-link>
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
                    <th>Jenis</th>
                    <th>Uraian</th>
                    <th>Koordinat (X, Y)</th>
                    <th>Debit Dalam Izin (M3/Bulan)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in sumberAir" :key="data.id">
                    <td>{{ data.jenis }}</td>
                    <td>-</td>
                    <td>X: {{ data.koordinat_x }} Y: {{ data.koordinat_y }}</td>
                    <td>{{ data.debit_dalam_izin }}</td>
                    <td>
                      <router-link
                        :to="{
                          path: data.id ? `/Data/SumberAir/Edit/${data.id}` : '/Data/SumberAir/Tambah',
                          query: {
                            jenis: data.id ? undefined : data.jenis
                          }
                        }"
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
