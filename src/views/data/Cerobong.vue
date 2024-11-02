<script setup>
import { onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { getCerobong } from '@/lib/cerobong.js'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()

onMounted(async () => {
  const loader = $loading.show()
  try {
    const data = await getCerobong()
    console.log(data)
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
          <h3>Data Cerobong</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="/Data/Cerobong/Tambah">
                  <!-- Change route as necessary -->
                  <i class="fa fa-plus me-2"></i>Tambah Cerobong
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
                    <th>Jenis Boiler/Jumlah Boiler(Buah)</th>
                    <th>Tinggi/Diameter/Kap. Boiler</th>
                    <th>Merk Boiler</th>
                    <th>Sistem Pengendalian Emisi Cerobong</th>
                    <th>Lubang Sampling</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
