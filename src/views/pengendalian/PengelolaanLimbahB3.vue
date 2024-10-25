<script setup>
import { ref } from 'vue'
import MainWrapper from '@/components/MainWrapper.vue'

const limbahData = ref([
  { id: 1, perusahaan: 'PT. Kimia Farma', jenis: 'Limbah B3 Padat', tanggal: '2024-10-20' },
  { id: 2, perusahaan: 'PT. Indofood', jenis: 'Limbah B3 Cair', tanggal: '2024-10-21' },
])
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>Pengelolaan Limbah B3</h5>
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
                <a class="btn btn-primary" href="add-waste.html">
                  <i class="fa fa-plus me-2"></i>Tambah Data Limbah
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
                <th>Perusahaan</th>
                <th>Jenis Limbah</th>
                <th>Tanggal Pengelolaan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in limbahData" :key="data.id">
                <td>{{ index + 1 }}</td>
                <td>{{ data.perusahaan }}</td>
                <td>{{ data.jenis }}</td>
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
