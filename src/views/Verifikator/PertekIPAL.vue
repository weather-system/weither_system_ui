<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import { getAllIpals } from '@/lib/company.js'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const route = useRoute()
const title = computed(() => {
  let ret = 'Semua Pertek IPAL'
  if (route.query.status === 'pending') ret = 'Pertek IPAL Pending'
  if (route.query.status === 'ditolak') ret = 'Pertek IPAL Ditolak'
  if (route.query.status === 'diterima') ret = 'Pertek IPAL Diterima'
  return ret
})

const companies = ref([])
const ipals = ref([])

const loadData = async () => {
  const loader = $loading.show()
  try {
    ipals.value = await getAllIpals(route.query.status)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

watch(
  () => route.query.status,
  async (latest, _) => {
    await loadData()
  },
  { immediate: true },
)
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit">
          <h5>{{ title }}</h5>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="tab-sets">
              <div class="tab-contents-sets">
                <ul>
                  <li>
                    <RouterLink
                      to="/Verifikator/PertekIPAL"
                      :class="{ active: route.query.status === undefined }"
                      >Semua Pertek IPAL</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Verifikator/PertekIPAL', query: { status: 'pending' } }"
                      :class="{ active: route.query.status === 'pending' }"
                      >Pertek IPAL Pending</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        path: '/Verifikator/PertekIPAL',
                        query: { status: 'diterima' },
                      }"
                      :class="{ active: route.query.status === 'diterima' }"
                      >Pertek IPAL Diterima</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Verifikator/PertekIPAL', query: { status: 'ditolak' } }"
                      :class="{ active: route.query.status === 'ditolak' }"
                      >Pertek IPAL Ditolak</RouterLink
                    >
                  </li>
                </ul>
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
                    <th>No</th>
                    <th>Tahun</th>
                    <th>Perusahaan</th>
                    <th>Sistem IPAL</th>
                    <th>Jenis</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="ipals.length === 0">
                    <td colspan="7" class="text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                  <tr v-for="(ipal, index) in ipals" :key="ipal.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ ipal.year_of_manufacture_of_ipal }}</td>
                    <td>{{ ipal.company ? ipal.company.name : '-'}}</td>
                    <td>{{ ipal.system_ipal }}</td>
                    <td>{{ ipal.type }}</td>
                    <td>
                      <h6
                        :class="{
                          'badge-pending': ipal.status === 'PENDING',
                          'badge-active': ipal.status === 'DITERIMA',
                          'badge-delete': ipal.status === 'DITOLAK',
                        }"
                      >
                        {{ ipal.status }}
                      </h6>
                    </td>
                    <td>
                      <router-link
                        :to="`/Verifikator/PertekIPAL/${ipal.id}`"
                        class="btn btn-primary"
                        >Verifikasi</router-link
                      >
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
