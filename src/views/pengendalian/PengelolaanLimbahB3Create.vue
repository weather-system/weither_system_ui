<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { createPengelolaanLimbahB3 } from '@/lib/pengelolaanLimbahB3.js'
import MainWrapper from '@/components/MainWrapper.vue'
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'

const router = useRouter()
const triwulan = ref('')
const tahun = ref('')
const currentYear = new Date().getFullYear()
const recentYears = Array.from({ length: 4 }, (_, i) => currentYear - i)
const fileUpload = ref(null)
const status = ref('Ajuan Baru')
const store = useStore()
const companyDetailId = ref(store.state.auth.user.company.company_detail.id)
const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('company_detail_id', companyDetailId.value)
  formData.append('triwulan', triwulan.value)
  formData.append('tahun', tahun.value)
  formData.append('file_upload', urlNIB.value)
  formData.append('status', status.value)

  try {
    await createPengelolaanLimbahB3(formData)
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Data successfully submitted!',
    }).then(() => {
      router.push('/pengendalian/PengelolaanLimbahB3')
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Gagal Menambahkan Data.',
    })
  }
}
const $loading = useLoading()
const urlNIB = ref('')
const uploadNIB = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    urlNIB.value = url
    console.log('Uploaded URL:', urlNIB.value)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <h4>Tambah Pengelolaan Limbah B3</h4>
        <form @submit.prevent="handleSubmit">
          <div class="row mt-5">
            <div class="col-md-4">
              <div class="form-group">
                <label for="triwulan">Triwulan</label>
                <select id="triwulan" v-model="triwulan" class="form-control">
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
              <select id="tahun" v-model="tahun" class="form-control">
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
              ><br /><img
                v-if="urlNIB"
                :src="urlNIB"
                style="max-width: 200px; max-height: auto; object-fit: contain"
              />
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
