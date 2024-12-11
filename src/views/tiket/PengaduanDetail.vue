<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' // untuk mengakses state dari store

const companyName = ref('')
const companyEmail = ref('')
const ticketTitle = ref('')
const ticketType = ref('')
const ticketPriority = ref('')
const ticketMessage = ref('')
const ticketReply = ref('')
const filePengaduan = ref(null)
const adminReply = ref('')
const isAdmin = computed(() => store.state.auth.user.role === 'ADMIN')
const canReply = ref(false)
const $loading = useLoading()
const route = useRoute()
const store = useStore()

// Fungsi untuk mengambil data perusahaan
const getCompanyData = async () => {
  try {
    const response = await axios.get('/api/companyticket')
    const company = response.data
    companyName.value = company.name || ''
    companyEmail.value = company.company_email || ''
  } catch (error) {
    console.error('Error fetching company data:', error)
    Swal.fire('Error', 'Failed to load company data', 'error')
  }
}

const fetchAdminStatus = async () => {
  try {
    const token = store.state.auth.token || localStorage.getItem('token')
    const response = await axios.get('/api/user/status', {
      Authorization: `Bearer ${token}`,
    })

    isAdmin.value = response.data.role === 'ADMIN' // Cek apakah user adalah admin
    canReply.value = response.data.status === 'can_reply'
  } catch (error) {
    console.error('Error fetching admin status:', error)
    if (error.response && error.response.status === 401) {
      Swal.fire('Error', 'Unauthorized. Please login again.', 'error')
    }
  }
}

const sendReply = async () => {
  try {
    if (!adminReply.value.trim()) {
      alert('Balasan tidak boleh kosong!')
      return
    }

    // Simpan balasan ke database menggunakan metode PUT
    await axios.put(`/api/tikets/${route.params.id}/balasan`, {
      balasan: adminReply.value, // Pastikan menggunakan nama field yang sesuai
    })

    // Perbarui ticketReply dengan balasan yang baru
    ticketReply.value = adminReply.value
    adminReply.value = '' // Reset input setelah berhasil
    Swal.fire('Sukses', 'Balasan berhasil dikirim!', 'success')
  } catch (error) {
    console.error('Error sending reply:', error.response.data)
    Swal.fire('Error', 'Gagal mengirim balasan: ' + (error.response.data.message || 'Terjadi kesalahan'), 'error')
  }
}

// Fungsi untuk mengambil detail tiket
const fetchTicketDetail = async ticketId => {
  try {
    const response = await axios.get(`/api/tikets/${ticketId}`)
    console.log('Ticket detail:', response.data)
    const ticket = response.data

    if (!ticket) {
      console.log('Ticket data is empty or undefined')
      return
    }

    ticketTitle.value = ticket.judul
    ticketType.value = ticket.jenissuportticket
    ticketPriority.value = ticket.prioritas
    ticketMessage.value = ticket.pesan
    ticketReply.value = ticket.balasan || ''
    filePengaduan.value = ticket.file_pengaduan || null
  } catch (error) {
    console.error('Error fetching ticket details:', error)
  }
}

onMounted(() => {
  fetchTicketDetail(route.params.id)
  getCompanyData()
  fetchAdminStatus()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Detail Tiket Pengaduan</h3>
            </div>
            <div class="row">
              <!-- Menampilkan Data Tiket -->
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Judul Pengaduan</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="ticketTitle"
                    disabled
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Jenis Support Ticket</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ticketType"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Prioritas</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="ticketPriority"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Pesan Pengaduan</label>
                  <textarea
                    v-model="ticketMessage"
                    class="form-control"
                    rows="4"
                    disabled
                  ></textarea>
                </div>
              </div>

              <div
                v-if="ticketReply && ticketReply.trim() !== ''"
                class="col-md-12"
              >
                <div class="form-group">
                  <label class="col-form-label">Pesan Balasan</label>
                  <textarea
                    class="form-control message-reply"
                    rows="4"
                    readonly
                    >{{ ticketReply }}</textarea
                  >
                </div>
              </div>

              <!-- Admin bisa mengirim balasan jika belum ada balasan -->
              <div v-else-if="isAdmin" class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Balasan Admin</label>
                  <textarea
                    v-model="adminReply"
                    class="form-control"
                    rows="4"
                    placeholder="Tulis balasan untuk tiket ini"
                  ></textarea>
                </div>
                <button @click="sendReply" class="btn btn-primary">
                  Kirim Balasan
                </button>
              </div>
              <!-- Lampiran File -->
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Lampirkan File Pengaduan</label>
                  <div v-if="filePengaduan">
                    <a :href="filePengaduan" target="_blank">Unduh File</a>
                  </div>
                  <div v-else>
                    <p>Tidak ada file yang dilampirkan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
