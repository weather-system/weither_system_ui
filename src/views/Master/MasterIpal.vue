<script setup>
import { ref, onMounted } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import axios from 'axios'
import MainWrapper from '@/components/MainWrapper.vue'
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router'

const $loading = useLoading()
const route = useRoute()
const ipals = ref([])

const fetchIpals = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get('/api/ipals_show', {
    params: {
      company_id:route.query.company_id,
    },
  })
    console.log('Response Data:', response.data.data)
    ipals.value = response.data.data.map(ipal => ({
      id: ipal.id,
      year_of_manufacture_of_ipal: ipal.year_of_manufacture_of_ipal || 'N/A',
      applicant_name: ipal.company_detail.pic_name || 'N/A',
      company_name: ipal.company_detail.company.name || 'N/A',
      address: ipal.company_detail.company.address || 'N/A',
      business_type: ipal.type || 'N/A',
    }))
  } catch (error) {
    console.error('Error fetching IPAL data:', error)
    Swal.fire('Error!', 'Gagal mengambil data IPAL.', 'error')
  } finally {
    loader.hide() // Sembunyikan loader
  }
}

// Fungsi untuk menghapus data IPAL
const deleteIpal = async id => {
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
      await axios.delete(`/api/ipals/${id}`) // API untuk menghapus data IPAL
      await fetchIpals() // Refresh data IPAL setelah penghapusan
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting IPAL:', error)
      Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data.', 'error')
    } finally {
      loader.hide()
    }
  }
}

// Panggil fetchIpals saat komponen dipasang
onMounted(() => {
  fetchIpals()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Persetujuan Teknis IPAL</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="IPAL/Tambah">
                  <i class="fa fa-plus me-2"></i>Tambah IPAL
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
                    <th>No</th>
                    <th>Tahun</th>
                    <th>Nama Pemohon</th>
                    <th>Nama Perusahaan</th>
                    <th>Alamat</th>
                    <th>Jenis Usaha</th>
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
                    <td>{{ ipal.applicant_name }}</td>
                    <td>{{ ipal.company_name }}</td>
                    <td>{{ ipal.address }}</td>
                    <td>{{ ipal.business_type }}</td>
                    <td>
                      <router-link
                        :to="`/Data/IPAL/Edit/${ipal.id}`"
                        class="btn btn-primary"
                        >Edit</router-link
                      >
                      <button
                        @click="deleteIpal(ipal.id)"
                        class="btn btn-primary m-2"
                      >
                        Delete
                      </button>
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

<style>
.img {
  width: 140px;
  height: 140px;
  object-fit: cover;
}
</style>
