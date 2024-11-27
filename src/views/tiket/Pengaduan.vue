<script setup>
import MainWrapper from '@/components/MainWrapper.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

// Variabel untuk data pengaduan
const complaints = ref([]);
const isLoading = ref(true); // Variabel loading

// Fungsi untuk mengambil data pengaduan berdasarkan perusahaan
const fetchComplaints = async () => {
  try {
    // Pastikan token autentikasi dikirim dalam header
    const response = await axios.get('/api/tikets');
    complaints.value = response.data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    Swal.fire('Error', 'Gagal mengambil data pengaduan', 'error');
  } finally {
    isLoading.value = false; // Set loading selesai
  }
};

// Fungsi untuk menghapus pengaduan
const deleteComplaint = async (id) => {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Pengaduan yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/tikets/${id}`);
        complaints.value = complaints.value.filter((item) => item.id !== id);
        Swal.fire('Terhapus!', 'Pengaduan berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Error deleting complaint:', error);
        Swal.fire('Error', 'Gagal menghapus pengaduan', 'error');
      }
    }
  });
};

// Ambil data pengaduan saat halaman dimuat
onMounted(() => {
  fetchComplaints();
});

// Fungsi untuk mengubah format jenis support ticket
const formatSupportTicket = (ticketType) => {
  const mapping = {
    faq: 'F.A.Q.',
    administrasi: 'Administrasi',
    permohonan_informasi_dan_dokumentasi: 'Permohonan Informasi dan Dokumentasi',
    pembayaran_biaya_penggandaan: 'Pembayaran Biaya Penggandaan'

  };
  return mapping[ticketType.toLowerCase()] || ticketType;
};
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header content-page-headersplit mb-2">
          <h3>Pengaduan</h3>
          <div class="list-btn">
            <ul>
              <li>
                <router-link class="btn btn-primary" to="/tiket/PengaduanCreate">
                  <i class="fa fa-plus me-2"></i>Tiket Pengaduan Baru
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
                  <tr v-for="(complaint, index) in complaints" :key="complaint.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ complaint.judul }}</td>
                    <td>{{ formatSupportTicket(complaint.jenissuportticket) }}</td>
                    <td>{{ complaint.status }}</td>
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
