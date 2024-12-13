<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute  } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import axios from 'axios'
import Swal from 'sweetalert2'
import { uploadFile } from '@/lib/filestorage'

const companyName = ref('')
const companyEmail = ref('')
const $loading = useLoading()
const ticketTitle = ref('')
const ticketType = ref('')
const ticketPriority = ref('')
const ticketMessage = ref('')
const filePengaduan = ref(null)
const router = useRouter()
const route = useRoute();

const handleFileChange = async e => {
  const loader = $loading.show() // Menampilkan loader
  const file = e.target.files[0]

  if (!file) {
    loader.hide()
    return
  }

  try {
    // Fungsi uploadFile adalah fungsi yang Anda implementasikan untuk mengunggah file
    const url = await uploadFile(file)

    // Setel URL file yang diunggah ke ref filePengaduan
    filePengaduan.value = url
  } catch (error) {
    console.error('Error uploading file:', error)
  } finally {
    loader.hide() // Sembunyikan loader
  }
}

// Ambil data perusahaan berdasarkan user yang login
const getCompanyData = async () => {
  try {
    const response = await axios.get('/api/companyticket')
    const company = response.data

    // Isi form dengan data perusahaan yang didapat
    companyName.value = company.name || ''
    companyEmail.value = company.company_email || ''
  } catch (error) {
    console.error('Error fetching company data:', error)
    Swal.fire('Error', 'Failed to load company data', 'error')
  }
}

const ticketTypeDisabled = ref(false);
onMounted(() => {
  getCompanyData();
  const queryTicketType = route.query.ticketType;
  if (queryTicketType) {
    ticketType.value = queryTicketType;
    ticketTypeDisabled.value = true;
  }
});

// Fungsi untuk kirim tiket
const submitTicket = async () => {
  if (
    !companyName.value ||
    !companyEmail.value ||
    !ticketTitle.value ||
    !ticketType.value ||
    !ticketMessage.value
  ) {
    Swal.fire('Error', 'Harap lengkapi semua informasi!', 'error')
    return
  }

  const formData = new FormData()
  formData.append('company_name', companyName.value)
  formData.append('email', companyEmail.value)
  formData.append('judul', ticketTitle.value)
  formData.append('jenissuportticket', ticketType.value)
  formData.append('prioritas', ticketPriority.value)
  formData.append('pesan', ticketMessage.value)

  if (filePengaduan.value) {
    formData.append('file_pengaduan', filePengaduan.value)
  }

  try {
    const response = await axios.post(
      'http://localhost:8000/api/tikets',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    Swal.fire('Sukses', 'Tiket pengaduan berhasil dikirim!', 'success')
    router.push('/tiket/pengaduan')
  } catch (error) {
    Swal.fire(
      'Error',
      `Gagal mengirim tiket: ${error.response?.data?.message || error.message}`,
      'error',
    )
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Daftar Tiket Pengaduan</h3>
            </div>
            <div class="row">
              <!-- Nama Perusahaan -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Nama Perusahaan</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="companyName"
                    disabled
                  />
                </div>
              </div>
              <!-- Email Perusahaan -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="companyEmail"
                    disabled
                  />
                </div>
              </div>
            </div>
            <!-- Judul Pengaduan -->
            <div class="col-md-12">
              <div class="form-group">
                <label class="col-form-label">Judul Pengaduan</label>
                <input type="text" class="form-control" v-model="ticketTitle" />
              </div>
            </div>
            <div class="row">
              <!-- Jenis Support Ticket -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Jenis Support Ticket</label>
                  <select class="form-control" v-model="ticketType" :disabled="ticketTypeDisabled">
                    <option value="" disabled selected>
                      Pilih Jenis Support Ticket
                    </option>
                    <option value="faq">F.A.Q</option>
                    <option value="administrasi">Administrasi</option>
                    <option value="permohonan_informasi_dan_dokumentasi">
                      Permohonan informasi dan dokumentasi
                    </option>
                    <option value="pembayaran_biaya_penggandaan">
                      Pembayaran biaya penggandaan
                    </option>
                  </select>
                </div>
              </div>
              <!-- Prioritas -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Prioritas</label>
                  <select class="form-control" v-model="ticketPriority">
                    <option value="" disabled selected>
                      Pilih Tingkat Prioritas
                    </option>
                    <option value="tinggi">Tinggi</option>
                    <option value="sedang">Sedang</option>
                    <option value="rendah">Rendah</option>
                  </select>
                </div>
              </div>
              <!-- Pesan Pengaduan -->
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Pesan</label>
                  <textarea
                    v-model="ticketMessage"
                    class="form-control"
                    rows="4"
                    placeholder="Masukan pesan Anda"
                  ></textarea>
                </div>
              </div>

              <!-- Lampiran File -->
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Lampirkan File Pengaduan</label>
                  <input
                    type="file"
                    class="form-control"
                    @change="handleFileChange"
                  />
                </div>
              </div>
              <div class="mt-4">
                <button class="btn btn-primary" @click="submitTicket">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<style scoped></style>
