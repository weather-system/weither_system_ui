<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getTpsB3, deleteTpsB3 } from '@/lib/tpsb3';
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()

const tpsB3 = ref([])

const deleteData = async (id) => {
  const loader = $loading.show()
  try {
    await deleteTpsB3(id)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  const loader = $loading.show()
  try {
    tpsB3.value = await getTpsB3()
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
          <h3>Data TPS B3</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="/Data/TPSB3/Tambah">
                  <!-- Change route as necessary -->
                  <i class="fa fa-plus me-2"></i>Tambah TPS B3
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
                    <th>Jenis Limbah B3</th>
                    <th>Sumber Limbah B3</th>
                    <th>Koordinat (X, Y)</th>
                    <th>Volume Limbah B3 Dalam Izin</th>
                    <th>Satuan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tpsB3" :key="data.id">
                    <td>{{ data.jenis_limbah_b3 }}</td>
                    <td>{{ data.sumber_limbah_b3 }}</td>
                    <td>{{ data.koordinat_x }}, {{ data.koordinat_y }}</td>
                    <td>{{ data.volume }}</td>
                    <td>{{ data.satuan }}</td>
                    <td>
                      <router-link
                        :to="`/Data/TPSB3/Edit/${data.id}`"
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
