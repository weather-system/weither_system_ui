<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { useRoute } from 'vue-router'

const companyName = ref('')
const companyEmail = ref('')
const ticketTitle = ref('')
const ticketType = ref('')
const ticketPriority = ref('')
const ticketMessage = ref('')
const filePengaduan = ref(null)
const adminReply = ref('')
const complaints = ref([])
const $loading = useLoading()
const route = useRoute()

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

// Fungsi untuk mengambil daftar pengaduan
const fetchTicketDetail = async ticketId => {
  try {
    const response = await axios.get(`/api/tikets/${ticketId}`)
    console.log('Ticket detail:', response.data) // Cek data yang diterima
    const ticket = response.data

    if (!ticket) {
      console.log('Ticket data is empty or undefined')
      return
    }

    ticketTitle.value = ticket.judul
    ticketType.value = ticket.jenissuportticket
    ticketPriority.value = ticket.prioritas
    ticketMessage.value = ticket.pesan
    filePengaduan.value = ticket.file_pengaduan || null
  } catch (error) {
    console.error('Error fetching ticket details:', error)
  }
}

onMounted(() => {
  fetchTicketDetail(route.params.id)
  getCompanyData()
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
              <div class="col-md-12" v-if="adminReply">
                <div class="form-group">
                  <label class="col-form-label">Pesan Balasan</label>
                  <textarea
                    class="form-control message-reply"
                    v-model="adminReply"
                    rows="4"
                    disabled
                  ></textarea>
                </div>
              </div>
              <div class="col-md-12" v-else>
                <p class="text-muted">Belum ada balasan dari admin.</p>
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
