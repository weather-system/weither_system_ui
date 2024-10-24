<script setup>
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import MainWrapper from '@/components/MainWrapper.vue'

const route = useRoute()
const title = computed(() => {
  let ret = 'Semua Perusahaan'
  if (route.query.status === 'pending') ret = 'Pending Perusahaan'
  if (route.query.status === 'ditolak') ret = 'Perusahaan Ditolak'
  if (route.query.status === 'diterima') ret = 'Perusahaan Diterima'
  return ret
})

const companies = ref([
  {
    id: 1,
    name: 'PT. Muhammad Azhari',
    address: 'Jalan Dago',
    nib: '123123123123123',
    company_phone_number: '12392032',
    charge_phone_number: '089560123123',
    status: 'Pending',
    created_by: 'M. Azhari',
  },
  {
    id: 2,
    name: 'PT. Air Bersih',
    address: 'Jalan Dipatiukur',
    nib: '123123123123123',
    company_phone_number: '12392032',
    charge_phone_number: '089560123123',
    status: 'Diterima',
    created_by: 'Ramadika',
  },
  {
    id: 3,
    name: 'PT. Baik Hati',
    address: 'Jalan Disitu',
    nib: '123123123123123',
    company_phone_number: '12392032',
    charge_phone_number: '089560123123',
    status: 'Ditolak',
    created_by: 'Ardi',
  },
])
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>{{ title }}</h5>
          <div class="list-btn">
            <ul>
              <li>
                <a class="btn-filters active" href="services.html"
                  ><i class="fe fe-list"></i>
                </a>
              </li>
              <li>
                <a class="btn-filters" href="localization.html"
                  ><i class="fe fe-settings"></i>
                </a>
              </li>
              <li>
                <div class="filter-sorting">
                  <ul>
                    <li>
                      <a href="javascript:void(0);" class="filter-sets"
                        ><img
                          src="@/assets/img/icons/filter1.svg"
                          class="me-2"
                          alt="img"
                        />Filter</a
                      >
                    </li>
                    <li>
                      <span
                        ><img
                          src="@/assets/img/icons/sort.svg"
                          class="me-2"
                          alt="img"
                      /></span>
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
                <a class="btn btn-primary" href="add-service.html"
                  ><i class="fa fa-plus me-2"></i>Tambah Perusahaan
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="tab-sets">
              <div class="tab-contents-sets">
                <ul>
                  <li>
                    <RouterLink
                      to="/Companies"
                      :class="{ active: route.query.status === undefined }"
                      >Semua Perusahaan</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Companies', query: { status: 'pending' } }"
                      :class="{ active: route.query.status === 'pending' }"
                      >Perusahaan Pending</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        path: '/Companies',
                        query: { status: 'diterima' },
                      }"
                      :class="{ active: route.query.status === 'diterima' }"
                      >Perusahaan Diterima</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Companies', query: { status: 'ditolak' } }"
                      :class="{ active: route.query.status === 'ditolak' }"
                      >Perusahaan Ditolak</RouterLink
                    >
                  </li>
                </ul>
              </div>
              <div class="tab-contents-count">
                <h6>Showing 8-10 of 84 results</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-resposnive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>NIB</th>
                    <th>Telp. Kantor</th>
                    <th>Telp. Penanggung Jawab</th>
                    <th>Status</th>
                    <th>Dibuat Oleh</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="company in companies" :key="company.id">
                    <td>
                      {{ company.name }}
                    </td>
                    <td>{{ company.address }}</td>
                    <td>{{ company.nib }}</td>
                    <td>{{ company.company_phone_number }}</td>
                    <td>{{ company.charge_phone_number }}</td>
                    <td>
                      <h6
                        :class="{
                          'badge-pending': company.status === 'Pending',
                          'badge-active': company.status === 'Diterima',
                          'badge-delete': company.status === 'Ditolak',
                        }"
                      >
                        {{ company.status }}
                      </h6>
                    </td>
                    <td>{{ company.created_by }}</td>
                    <td>
                      <div class="table-actions d-flex">
                        <a
                          class="btn btn-primary me-2"
                          href="edit-service.html"
                        >
                          Detail
                        </a>
                        <a
                          v-if="company.status === 'Pending'"
                          class="btn btn-success me-2"
                          href="edit-service.html"
                        >
                          Terima
                        </a>
                        <a
                          v-if="company.status === 'Pending'"
                          class="btn btn-danger"
                          href="javascript:void(0);"
                          data-bs-toggle="modal"
                          data-bs-target="#delete-item"
                        >
                          Tolak
                        </a>
                      </div>
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
