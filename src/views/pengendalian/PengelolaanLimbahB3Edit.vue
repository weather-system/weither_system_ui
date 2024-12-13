<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import axios from 'axios'
import MainWrapper from '@/components/MainWrapper.vue'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'

const router = useRouter()
const route = useRoute()
const currentYear = new Date().getFullYear()
const recentYears = Array.from({ length: 4 }, (_, i) => currentYear - i)
const urlNIB = ref('')
const $loading = useLoading()
const form = ref({
  triwulan: '',
  tahun: '',
  file_upload: '',
  status: '',
  company_detail_id: '',
})
const licenceId = route.params.id
const fetchLicenceDetails = async () => {
  try {
    const response = await axios.get(`/api/pengelolaan-limbah-b3/${licenceId}`)
    Object.assign(form.value, response.data)
  } catch (error) {
    console.error('Error fetching license details:', error)
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
    console.log('Data yang akan dikirim:', form.value)

    await axios.put(`/api/pengelolaan-limbah-b3/${licenceId}`, form.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await Swal.fire({
      title: 'Success!',
      text: 'Data berhasil diperbarui!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/pengendalian/PengelolaanLimbahB3')
  } catch (error) {
    console.error('Error updating license:', error)
    if (error.response && error.response.data) {
      const errors = error.response.data
      let errorMessages = ''
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorMessages += `${errors[key].join(', ')}\n`
        }
      }
      await Swal.fire({
        title: 'Error!',
        text: `Gagal memperbarui data:\n${errorMessages}`,
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } else {
      await Swal.fire({
        title: 'Error!',
        text: 'Gagal memperbarui data.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }
}
onMounted(() => {
  fetchLicenceDetails()
})

const uploadNIB = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    urlNIB.value = url
    form.value.file_upload = urlNIB.value
    console.log('Uploaded URL:', urlNIB.value)
  } catch (e) {
    console.error('File upload error:', e)
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <h4>Edit Pengelolaan Limbah B3</h4>
        <form @submit.prevent="submitForm">
          <div class="row mt-5">
            <div class="col-md-4">
              <div class="form-group">
                <label for="triwulan">Triwulan</label>
                <select v-model="form.triwulan" class="form-control">
                  <option value="">Pilih Triwulan</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label for="tahun">Tahun</label>
              <select v-model="form.tahun" class="form-control">
                <option value="" disabled>Pilih Tahun</option>
                <option v-for="year in recentYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-5">
              <label for="photo">Upload File</label>
              <input type="file" @change="uploadNIB" class="form-control" />
              <small class="form-text text-muted"
                >Maksimal ukuran file: 20MB</small
              >
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label></label>
                <img
                  :src="form.file_upload"
                  alt="Uploaded Photo"
                  class="img-thumbnail mt-2"
                  style="
                    max-width: 200px;
                    max-height: auto;
                    object-fit: contain;
                  "
                />
              </div>
            </div>
          </div>

          <div class="text-right">
            <button type="submit" class="btn btn-primary">Simpan</button>
            <router-link
              to="/pengendalian/PengelolaanLimbahB3"
              class="btn btn-secondary m-2"
              >Kembali</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
