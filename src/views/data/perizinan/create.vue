<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'
import axios from 'axios'
import Swal from 'sweetalert2' // Import SweetAlert2
import MainWrapper from '@/components/MainWrapper.vue'

const form = ref({
  type: '',
  license_number: '',
  issuing_agency: '',
  permit_date: '',
  permit_date_expired: '',
  photo: '', // Field for photo URL
})

const $loading = useLoading()
const router = useRouter()
const urlNIB = ref('')

const uploadNIB = async e => {
  const loader = $loading.show() // Ensure $loading is defined or replace with your loading logic
  try {
    const url = await uploadFile(e.target.files[0]) // Ensure uploadFile is a defined function
    urlNIB.value = url
    form.value.photo = urlNIB.value
    console.log('Uploaded URL:', urlNIB.value)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const submitForm = async () => {
  try {
    await axios.post('http://localhost:8000/api/company_licence', form.value)
    // Display success alert
    await Swal.fire({
      title: 'Success!',
      text: 'Perizinan berhasil ditambahkan!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/data/perizinan') // Redirect to the list page after success
  } catch (error) {
    console.error('Error adding license:', error)
    // Display error alert
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
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <label for="license_number">Nomor Izin</label>
                <input
                  type="text"
                  v-model="form.license_number"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-4">
                <div class="form-group">
                  <label for="issuing_agency">Instansi Yang Mengeluarkan</label>
                  <input
                    type="text"
                    v-model="form.issuing_agency"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="mb-4">
                <div class="form-group">
                  <label for="permit_date">Tanggal Izin</label>
                  <input
                    type="date"
                    v-model="form.permit_date"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="mb-4">
                <div class="form-group">
                  <label for="permit_date_expired">Tanggal Izin Berakhir</label>
                  <input
                    type="date"
                    v-model="form.permit_date_expired"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="photo">Upload Photo</label>
                <input type="file" @change="uploadNIB" class="form-control" />
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="field-btns">
                    <button class="btn btn-primary next_btn" type="submit">
                      Simpan
                    </button>
                    <router-link
                      to="/Data/Perizinan"
                      class="btn btn-secondary m-2"
                      >Kembali</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
