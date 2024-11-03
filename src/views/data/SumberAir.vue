<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { getSumberAir, deleteSumberAir } from '@/lib/sumberAir';

const $loading = useLoading()

const sumberAir = ref([])

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

onMounted(async () => {
  const loader = $loading.show()
  try {
    sumberAir.value = await getSumberAir()
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
          <h3>Data Sumber Air</h3>
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
                        :to="`/Data/SumberAir/Edit/${data.id}`"
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
