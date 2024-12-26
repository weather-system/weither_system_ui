<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import { getAllForAdmin } from '@/lib/tpsb3.js'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const route = useRoute()
const title = computed(() => {
  let ret = 'Semua Rintek LB3'
  if (route.query.status === 'pending') ret = 'Rintek LB3 Pending'
  if (route.query.status === 'ditolak') ret = 'Rintek LB3 Ditolak'
  if (route.query.status === 'diterima') ret = 'Rintek LB3 Diterima'
  return ret
})

const lb3s = ref([])

const loadData = async () => {
  const loader = $loading.show()
  try {
    lb3s.value = await getAllForAdmin(route.query.status)
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
                      to="/Verifikator/RintekLB3"
                      :class="{ active: route.query.status === undefined }"
                      >Semua Rintek LB3</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Verifikator/RintekLB3', query: { status: 'pending' } }"
                      :class="{ active: route.query.status === 'pending' }"
                      >Rintek LB3 Pending</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        path: '/Verifikator/RintekLB3',
                        query: { status: 'diterima' },
                      }"
                      :class="{ active: route.query.status === 'diterima' }"
                      >Rintek LB3 Diterima</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Verifikator/RintekLB3', query: { status: 'ditolak' } }"
                      :class="{ active: route.query.status === 'ditolak' }"
                      >Rintek LB3 Ditolak</RouterLink
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
                    <th>Perusahaan</th>
                    <th>Sumber Limbah</th>
                    <th>Koordinat (X,Y)</th>
                    <th>Masa Berlaku</th>
                    <th>Status</th>
                    <th>Tanggal Pengajuan</th>
                    <th>Tanggal Verifikasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="lb3s.length === 0">
                    <td colspan="7" class="text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                  <tr v-for="(lb3, index) in lb3s" :key="lb3.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ lb3.company ? lb3.company.name : '-'}}</td>
                    <td>{{ lb3.sumber_limbah_b3 }}</td>
                    <td>{{ lb3.koordinat_x }}, {{ lb3.koordinat_y }}</td>
                    <td>{{ lb3.masa_berlaku }}</td>
                    <td>
                      <h6
                        :class="{
                          'badge-pending': lb3.status === 'PENDING',
                          'badge-active': lb3.status === 'DITERIMA',
                          'badge-delete': lb3.status === 'DITOLAK',
                        }"
                      >
                        {{ lb3.status }}
                      </h6>
                    </td>
                    <td>{{ lb3.created_at }}</td>
                    <td>12 November 2024</td>
                    <td>
                      <router-link
                        :to="`/Verifikator/RintekLB3/${lb3.id}`"
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
