<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { watch } from 'vue'

const router = useRouter()
const $loading = useLoading()
const route = useRoute()

// Variabel untuk data pengaduan
const complaints = ref([])
const isLoading = ref(true) // Variabel loading
const statusOptions = ['New Ticket', 'In Progress', 'Solved', 'Closed']
const title = computed(() => {
  let ret = 'Tiket Pengaduan'
  if (route.query.status === 'New Ticket') ret = 'Tiket Baru'
  if (route.query.status === 'In Progress') ret = 'Tiket Diproses'
  if (route.query.status === 'Solved') ret = 'Tiket Selesai'
  if (route.query.status === 'Closed') ret = 'Tiket Ditutup'
  return ret
})

const updateStatus = async (id, newStatus) => {
  try {
    // Tampilkan loading saat proses
    Swal.fire({
      title: 'Memperbarui status...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    const response = await axios.put(`/api/master/tikets/${id}/status`, {
      status: newStatus,
    })

    if (response.data.success) {
      const complaint = complaints.value.find(item => item.id === id)
      if (complaint) {
        complaint.status = newStatus
      }

      Swal.fire('Berhasil!', 'Status berhasil diperbarui.', 'success')
    } else {
      Swal.fire(
        'Error',
        response.data.message || 'Gagal memperbarui status',
        'error',
      )
    }
  } catch (error) {
    console.error('Error updating status:', error)

    const errorMessage =
      error.response?.data?.message ||
      'Terjadi kesalahan saat memperbarui status'
    Swal.fire('Error', errorMessage, 'error')
  }
}

// Fungsi untuk mengambil data pengaduan
const fetchComplaints = async () => {
  try {
    const statusFilter = route.query.status || null;  // Mengambil status dari query parameter
    console.log('Status Filter:', statusFilter); // Debugging log untuk memastikan status yang terambil

    const response = await axios.get('/api/master/tikets', {
      params: { status: statusFilter } // Mengirim status filter ke API jika ada
    });

    if (response.data && response.data.data) {
      complaints.value = response.data.data; // Memperbarui data pengaduan
    } else {
      complaints.value = [];
      Swal.fire('Tidak ada data', 'Tidak ada pengaduan yang ditemukan', 'info');
    }
  } catch (error) {
    console.error('Error fetching complaints:', error);
    Swal.fire('Error', 'Gagal mengambil data pengaduan', 'error');
  } finally {
    isLoading.value = false; // Menghentikan loading setelah data selesai dimuat
  }
};

// Fungsi untuk menghapus pengaduan
const deleteComplaint = async id => {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Pengaduan yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
  }).then(async result => {
    if (result.isConfirmed) {
      try {
        // Hapus pengaduan berdasarkan ID
        const response = await axios.delete(`/api/master/tikets/${id}`)

        if (response.data.success) {
          // Jika berhasil dihapus, filter data pengaduan yang ada
          complaints.value = complaints.value.filter(item => item.id !== id)
          Swal.fire('Terhapus!', 'Pengaduan berhasil dihapus.', 'success')
        }
      } catch (error) {
        console.error('Error deleting complaint:', error)
        Swal.fire('Error', 'Gagal menghapus pengaduan', 'error')
      }
    }
  })
}

watch(
  () => route.query.status, // Memantau perubahan pada query parameter 'status'
  async (newStatus, oldStatus) => {
    if (newStatus !== oldStatus) {
      isLoading.value = true;  // Menandakan data sedang dimuat
      await fetchComplaints(); // Panggil fungsi untuk mengambil data berdasarkan status baru
    }
  },
  { immediate: true }, // Langsung eksekusi saat pertama kali komponen dimuat
)


// Ambil data pengaduan saat halaman dimuat
onMounted(() => {
  fetchComplaints()
})

// Fungsi untuk mengubah format jenis support ticket
const formatSupportTicket = ticketType => {
  const mapping = {
    faq: 'F.A.Q.',
    administrasi: 'Administrasi',
    permohonan_informasi_dan_dokumentasi:
      'Permohonan Informasi dan Dokumentasi',
    pembayaran_biaya_penggandaan: 'Pembayaran Biaya Penggandaan',
  }
  return mapping[ticketType.toLowerCase()] || ticketType
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <h3>{{ title }}</h3>
          <!-- Menampilkan judul dinamis berdasarkan status -->
          <div class="list-btn">
            <ul>
              <li>
                <router-link
                  class="btn btn-primary"
                  to="/tiket/PengaduanCreate"
                >
                  <i class="fa fa-plus me-2"></i>Tiket Pengaduan Baru
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Filter Status -->
        <div class="row">
          <div class="col-12">
            <div class="tab-sets">
              <div class="tab-contents-sets">
                <ul>
                  <li>
                    <router-link
                      to="/Master/Operator/Tiket"
                      :class="{ active: route.query.status === undefined }"
                      >Semua Tiket</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        path: '/Master/Operator/Tiket',
                        query: { status: 'New Ticket' },
                      }"
                      :class="{ active: route.query.status === 'New Ticket' }"
                      >Tiket Baru</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        path: '/Master/Operator/Tiket',
                        query: { status: 'In Progress' },
                      }"
                      :class="{ active: route.query.status === 'In Progress' }"
                      >Tiket Diproses</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        path: '/Master/Operator/Tiket',
                        query: { status: 'Solved' },
                      }"
                      :class="{ active: route.query.status === 'Solved' }"
                      >Tiket Selesai</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        path: '/Master/Operator/Tiket',
                        query: { status: 'Closed' },
                      }"
                      :class="{ active: route.query.status === 'Closed' }"
                      >Tiket Ditutup</router-link
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
                    <th>Judul</th>
                    <th>Jenis Support Ticket</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td colspan="5" class="text-center">
                      Memuat data pengaduan...
                    </td>
                  </tr>
                  <tr
                    v-for="(complaint, index) in complaints"
                    :key="complaint.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ complaint.judul }}</td>
                    <td>
                      {{ formatSupportTicket(complaint.jenissuportticket) }}
                    </td>
                    <td>
                      <select
                        v-model="complaint.status"
                        @change="updateStatus(complaint.id, complaint.status)"
                        class="form-select"
                      >
                        <option
                          v-if="!statusOptions.includes(complaint.status)"
                          :value="complaint.status"
                        >
                          {{ complaint.status }}
                        </option>
                        <option
                          v-for="option in statusOptions"
                          :key="option"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <router-link
                        :to="`/tiket/PengaduanDetail/${complaint.id}`"
                        class="btn btn-primary"
                      >
                        Detail
                      </router-link>
                      <button
                        @click="deleteComplaint(complaint.id)"
                        class="btn btn-danger m-2"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                  <tr v-if="complaints.length === 0 && !isLoading">
                    <td colspan="5" class="text-center">
                      Tidak ada data pengaduan untuk perusahaan ini.
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
