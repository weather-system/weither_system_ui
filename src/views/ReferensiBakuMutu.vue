<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import PageHeader from '@/components/PageHeader.vue'
import {
  getReferensiBakuMutu,
  deleteReferensiBakuMutu,
} from '@/lib/referensiBakuMutu.js'

const $loading = useLoading()
const route = useRoute()

const data = ref([])

const deleteData = async id => {
  try {
    const { isConfirmed } = await Swal.fire({
      title: 'Apa kamu yakin ?',
      text: 'Kamu tidak akan bisa mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    })

    if (isConfirmed) {
      const loader = $loading.show()
      try {
        await deleteReferensiBakuMutu(id)
        Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
        await loadData() // Reload the data only after successful deletion
      } catch (e) {
        console.error('Error deleting data:', e)
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data.', 'error')
      } finally {
        loader.hide()
      }
    }
  } catch (e) {
    console.error('Error during delete confirmation:', e)
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    const response = await getReferensiBakuMutu({
      ...route.query
    })
    data.value = response
  } catch (e) {
    console.error('Error loading data:', e)
  } finally {
    loader.hide()
  }
}

const getKategori = jenis => {
  switch (jenis) {
    case 'Limbah Domestik Tersendiri':
      return 'IPAL'
    case 'Udara Ambien':
      return 'Ambien'
    case 'Udara Emisi':
    case 'Kebisingan':
      return 'Emisi'
    default:
      return '-'
  }
}

watch(
  () => route.query.jenis_baku_mutu,
  async () => {
    await loadData()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <PageHeader>
    <h5>Referensi Baku Mutu</h5>
    <div class="list-btn">
      <ul>
        <li>
          <RouterLink :to="{ path: '/w/ReferensiBakuMutu/Create', query: route.query }" class="btn btn-primary">
            <i class="fa fa-plus me-2"></i>Tambah Referensi Baku Mutu
          </RouterLink>
        </li>
      </ul>
    </div>
  </PageHeader>

  <div class="row">
    <div class="col-12">
      <div class="table-responsive table-div">
        <table class="table datatable">
          <thead>
            <tr>
              <th>Jenis</th>
              <th>Referensi</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="data.length < 1">
              <td colspan="4" class="text-center">Data belum ada</td>
            </tr>
            <tr v-else v-for="d in data" :key="d.id">
              <td>
                {{ d.jenis }}
                <template v-if="d.jenis == 'Limbah Integrasi'">
                  <p class="m-0">Jenis Usaha: <span class="fw-bold">{{ d.jenis_usaha.jenis }}</span></p>
                  <p class="m-0">Detail: <span class="fw-bold">{{ d.detail_jenis_usaha }}</span></p>
                </template>
              </td>
              <td>{{ d.referensi }}</td>
              <td>
                {{ getKategori(d.jenis) }}
              </td>
              <td>
                <RouterLink :to="{ path: `/w/ReferensiBakuMutu/${d.id}`, query: route.query }" class="btn btn-success me-2">
                  Ubah
                </RouterLink>
                <button class="btn btn-danger" @click="deleteData(d.id)">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
