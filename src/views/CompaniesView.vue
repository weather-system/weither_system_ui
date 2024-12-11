<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import {
  getCompanies,
  updateCompanyStatus,
  fetchCompanies,
} from '@/lib/company.js'
import Swal from 'sweetalert2'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const route = useRoute()
const title = computed(() => {
  let ret = 'Semua Perusahaan'
  if (route.query.status === 'pending') ret = 'Perusahaan Pending'
  if (route.query.status === 'ditolak') ret = 'Perusahaan Ditolak'
  if (route.query.status === 'diterima') ret = 'Perusahaan Diterima'
  return ret
})

const companies = ref([])

const acceptCompany = async id => {
  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Perusahaan akan diterima!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Terima',
    cancelButtonText: 'Batal',
  })

  if (result.isConfirmed) {
    const loader = $loading.show()
    try {
      await updateCompanyStatus(id, 'accept')
      companies.value = companies.value.map(company =>
        company.id === id ? { ...company, status: 'DITERIMA' } : company,
      )
      Swal.fire('Berhasil!', 'Perusahaan telah diterima.', 'success')
    } catch (e) {
      console.error(e)
      Swal.fire(
        'Gagal!',
        'Terjadi kesalahan saat menerima perusahaan.',
        'error',
      )
    } finally {
      loader.hide()
    }
  }
}

const rejectCompany = async id => {
  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Perusahaan akan ditolak!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Tolak',
    cancelButtonText: 'Batal',
  })

  if (result.isConfirmed) {
    const loader = $loading.show()
    try {
      await updateCompanyStatus(id, 'reject')
      companies.value = companies.value.map(company =>
        company.id === id ? { ...company, status: 'DITOLAK' } : company,
      )
      Swal.fire('Berhasil!', 'Perusahaan telah ditolak.', 'success')
    } catch (e) {
      console.error(e)
      Swal.fire('Gagal!', 'Terjadi kesalahan saat menolak perusahaan.', 'error')
    } finally {
      loader.hide()
    }
  }
}

watch(
  () => route.query.status,
  async (latest, _) => {
    const loader = $loading.show()
    try {
      companies.value = await getCompanies({
        status: latest?.toUpperCase(),
      })
    } catch (e) {
      console.error(e)
    } finally {
      loader.hide()
    }
  },
  { immediate: true },
)
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h3>{{ title }}</h3>
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
                    <th>SKKL</th>
                    <th>Nomer Kontak</th>
                    <th>Penanggung Jawab</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="company in companies" :key="company.id">
                    <td>
                      {{ company.name }}
                    </td>
                    <td>{{ company.address }}</td>
                    <td>{{ company.no_skkl }}</td>
                    <td>{{ company.contact_person }}</td>
                    <td>{{ company.in_charge_ukl_upl }}</td>
                    <td>
                      <h6
                        :class="{
                          'badge-pending': company.status === 'PENDING',
                          'badge-active': company.status === 'DITERIMA',
                          'badge-delete': company.status === 'DITOLAK',
                        }"
                      >
                        {{ company.status }}
                      </h6>
                    </td>
                    <td>
                      <div class="table-actions d-flex">
                        <RouterLink
                          :to="{
                            path: '/CompanyDetail',
                            query: { id: company.id },
                          }"
                          class="btn btn-primary me-2"
                          >Detail</RouterLink
                        >
                        <a
                          v-if="company.status === 'PENDING'"
                          @click.prevent="acceptCompany(company.id)"
                          class="btn btn-success me-2"
                        >
                          Terima
                        </a>
                        <a
                          v-if="company.status === 'PENDING'"
                          @click.prevent="rejectCompany(company.id)"
                          class="btn btn-danger"
                          href="javascript:void(0);"
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
