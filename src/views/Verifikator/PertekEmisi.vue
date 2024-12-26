<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import { getAllCerobong } from '@/lib/cerobong.js'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const route = useRoute()
const title = computed(() => {
  let ret = 'Semua Pertek Emisi'
  if (route.query.status === 'pending') ret = 'Pertek Emisi Pending'
  if (route.query.status === 'ditolak') ret = 'Pertek Emisi Ditolak'
  if (route.query.status === 'diterima') ret = 'Pertek Emisi Diterima'
  return ret
})

const emisis = ref([])

const loadData = async () => {
  const loader = $loading.show();
  try {
    console.log('Fetching data with status:', route.query.status); // Debugging
    const response = await getAllCerobong(route.query.status);
    console.log('Data fetched:', response); // Tambahkan log respons API
    emisis.value = response;
  } catch (e) {
    console.error('Error loading data:', e);
    Swal.fire({
      icon: 'error',
      title: 'Gagal Memuat Data',
      text: 'Terjadi kesalahan saat memuat data. Coba lagi nanti.',
    });
  } finally {
    loader.hide();
  }
};


watch(
  () => route.query.status,
  async () => {
    await loadData()
  },
  { immediate: true }
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
                      to="/Verifikator/Pertekemisi"
                      :class="{ active: !route.query.status }"
                      >Semua Pertek Emisi</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Verifikator/PertekEmisi', query: { status: 'pending' } }"
                      :class="{ active: route.query.status === 'pending' }"
                      >Pertek Emisi Pending</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{
                        path: '/Verifikator/PertekEmisi',
                        query: { status: 'diterima' },
                      }"
                      :class="{ active: route.query.status === 'diterima' }"
                      >Pertek Emisi Diterima</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ path: '/Verifikator/PertekEmisi', query: { status: 'ditolak' } }"
                      :class="{ active: route.query.status === 'ditolak' }"
                      >Pertek Emisi Ditolak</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="table-responsive table-div">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Perusahaan</th>
                    <th>Jenis Boiler (Jumlah)</th>
                    <th>Tinggi/Diameter/Kap. Boiler</th>
                    <th>Koordinat</th>
                    <th>Status</th>
                    <th>Tanggal Pengajuan</th>
                    <th>Tanggal Verifikasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="emisis.length === 0">
                    <td colspan="9" class="text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                  <tr v-for="(emisi, index) in emisis" :key="emisi.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ emisi.company ? emisi.company.name : '-' }}</td>
                    <td>{{ emisi.jenis_boiler }} ({{ emisi.jumlah_boiler }})</td>
                    <td>
                        T: {{ emisi.tinggi_cerobong }}, D:
                        {{ emisi.diameter_cerbong }}, Kap:
                        {{ emisi.kapasitas_boiler }}
                    </td>
                    <td>{{ emisi.koordinat_x }}, {{ emisi.koordinat_y }}</td>
                    <td>
                      <h6
                        :class="{
                          'badge-pending': emisi.status === 'PENDING',
                          'badge-active': emisi.status === 'DITERIMA',
                          'badge-delete': emisi.status === 'DITOLAK',
                        }"
                      >
                        {{ emisi.status }}
                      </h6>
                    </td>
                    <td>{{ emisi.created_at }}</td>
                    <td>{{ emisi.verified_at || '-' }}</td>
                    <td>
                      <router-link
                        :to="`/Verifikator/PertekEmisi/${emisi.id}`"
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
