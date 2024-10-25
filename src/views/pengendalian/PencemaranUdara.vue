<script setup>
import { ref } from 'vue'
import MainWrapper from '@/components/MainWrapper.vue'

const udaraData = ref([
  { id: 1, lokasi: 'Jakarta', kualitas: 'Buruk', parameter: 'PM2.5, NO2', tanggal: '2024-10-22' },
  { id: 2, lokasi: 'Bandung', kualitas: 'Sedang', parameter: 'CO, SO2', tanggal: '2024-10-23' },
])
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Pengendalian Pencemaran Udara</h5>
          <div class="list-btn">
            <ul>
              <li>
                <a class="btn-filters active" href="services.html">
                  <i class="fe fe-list"></i>
                </a>
              </li>
              <li>
                <a class="btn-filters" href="localization.html">
                  <i class="fe fe-settings"></i>
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
                    <li>
                      <span>
                        <img src="@/assets/img/icons/sort.svg" class="me-2" alt="img" />
                      </span>
                      <div class="review-sort">
                        <select class="select">
                          <option>A -> Z</option>
                          <option>Z -> A</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a class="btn btn-primary" href="add-service.html">
                  <i class="fa fa-plus me-2"></i>Tambah Data Udara
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="table-responsive table-div">
          <table class="table datatable">
            <thead>
              <tr>
                <th>No</th>
                <th>Lokasi</th>
                <th>Kualitas Udara</th>
                <th>Parameter</th>
                <th>Tanggal Pengukuran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in udaraData" :key="data.id">
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
