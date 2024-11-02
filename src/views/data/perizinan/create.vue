<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2' // Import SweetAlert2
import MainWrapper from '@/components/MainWrapper.vue'

const form = ref({
  type: '',
  license_number: '',
  issuing_agency: '',
  permit_date: '',
  permit_date_expired: '',
  photo: '',
})

const router = useRouter()

const submitForm = async () => {
  try {
    await axios.post('http://localhost:8000/api/company_licence', form.value)
    // Menampilkan alert sukses
    await Swal.fire({
      title: 'Success!',
      text: 'Perizinan berhasil ditambahkan!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/data/perizinan') // Mengalihkan ke halaman list setelah berhasil
  } catch (error) {
    console.error('Error adding license:', error)
    // Menampilkan alert error
    await Swal.fire({
      title: 'Error!',
      text: 'Gagal menambahkan perizinan.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Tambah Perizinan</h3>
        </div>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="type">Jenis</label>
            <input
              type="text"
              v-model="form.type"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="license_number">Nomor Izin</label>
            <input
              type="text"
              v-model="form.license_number"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="issuing_agency">Instansi Yang Mengeluarkan</label>
            <input
              type="text"
              v-model="form.issuing_agency"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="permit_date">Tanggal Izin</label>
            <input
              type="date"
              v-model="form.permit_date"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="permit_date_expired">Tanggal Izin Berakhir</label>
            <input
              type="date"
              v-model="form.permit_date_expired"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="photo">Foto (URL)</label>
            <input
              type="text"
              v-model="form.photo"
              class="form-control"
              required
            />
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="field-btns">
                <button class="btn btn-primary next_btn" type="submit">
                  Simpan
                </button>
                <router-link to="/Data/Perizinan" class="btn btn-secondary m-2"
                  >Kembali</router-link
                >
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
