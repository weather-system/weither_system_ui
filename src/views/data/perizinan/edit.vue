<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
const route = useRoute()
const licenceId = route.params.id // Get the license ID from the route parameters

const fetchLicenceDetails = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/company_licence/${licenceId}`
    )
    Object.assign(form.value, response.data)
  } catch (error) {
    console.error('Error fetching license details:', error)
    // Optional: Show an alert if fetching fails
    await Swal.fire({
      title: 'Error!',
      text: 'Gagal mengambil detail perizinan.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }
}

const submitForm = async () => {
  try {
    await axios.put(
      `http://localhost:8000/api/company_licence/${licenceId}`,
      form.value
    )
    // Show success alert using SweetAlert2
    await Swal.fire({
      title: 'Success!',
      text: 'Perizinan berhasil diperbarui!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/data/perizinan') // Redirect to the list page after successful update
  } catch (error) {
    console.error('Error updating license:', error)
    // Show error alert using SweetAlert2
    await Swal.fire({
      title: 'Error!',
      text: 'Gagal memperbarui perizinan.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }
}

// Fetch license details on component mount
onMounted(() => {
  fetchLicenceDetails()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Edit Perizinan</h3>
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
                <router-link to="/data/perizinan" class="btn btn-secondary m-2">Kembali</router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
