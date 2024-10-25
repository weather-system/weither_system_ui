<script setup>
import { ref } from 'vue'
import MainWrapper from '@/components/MainWrapper.vue'  // Import MainWrapper

const airData = ref([
  { id: 1, lokasi: 'Danau Toba', kualitas: 'Baik', parameter: 'pH, DO', tanggal: '2024-10-20' },
  { id: 2, lokasi: 'Sungai Citarum', kualitas: 'Buruk', parameter: 'BOD, COD', tanggal: '2024-10-21' },
])
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Pengendalian Pencemaran Air</h5>
          <div class="list-btn">
            <ul>
              <li>
                <a class="btn btn-primary" href="add-water-quality.html">
                  <i class="fa fa-plus me-2"></i>Tambah Kualitas Air
                </a>
              </li>
              <li>
                <div class="filter-sorting">
                  <ul>
                    <li>
                      <a href="javascript:void(0);" class="filter-sets">
                        <img src="@/assets/img/icons/filter1.svg" class="me-2" alt="img" />Filter
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="table-responsive table-div">
          <table class="table datatable table-bordered mt-3">
            <thead>
              <tr>
                <th>No</th>
                <th>Lokasi</th>
                <th>Kualitas Air</th>
                <th>Parameter</th>
                <th>Tanggal Pengukuran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in airData" :key="data.id">
                <td>{{ index + 1 }}</td>
                <td>{{ data.lokasi }}</td>
                <td>{{ data.kualitas }}</td>
                <td>{{ data.parameter }}</td>
                <td>{{ data.tanggal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
