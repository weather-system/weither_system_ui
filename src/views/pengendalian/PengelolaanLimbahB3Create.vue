<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { uploadFile } from '@/lib/filestorage.js'
import * as yup from 'yup'
import { createPengelolaanLimbahB3, parameters } from '@/lib/pengelolaanLimbahB3.js'
import MainWrapper from '@/components/MainWrapper.vue'
const router = useRouter()

const companyDetailId = ref('')
const triwulan = ref('')
const tahun = ref('')
const fileUpload = ref(null)
const status = ref('Ajuan Baru')


const fetchCompanyDetailId = async () => {
  const userId = '1';

  try {
    const response = await fetch(`/api/company_details/${userId}`);
    if (response.ok) {
      const data = await response.json();
      companyDetailId.value = data.company_detail_id;
    } else {
      console.error('Gagal memuat company detail ID');
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat memuat company detail ID:', error);
  }
}


onMounted(() => {
  fetchCompanyDetailId()
})


const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('company_detail_id', companyDetailId.value)
  formData.append('triwulan', triwulan.value)
  formData.append('tahun', tahun.value)
  formData.append('file_upload', fileUpload.value)
  formData.append('status', status.value)

  try {
    const response = await fetch('/api/pengelolaan-limbah-b3', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      // Jika berhasil, arahkan pengguna ke halaman yang diinginkan
      router.push('/PengelolaanLimbahB3')
    } else {
      const errorData = await response.json()
      console.error('Gagal menyimpan data:', errorData)
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <h3>Create Pengelolaan Limbah B3</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="companyDetailId">Company Detail ID</label>
            <input
              type="text"
              id="companyDetailId"
              v-model="companyDetailId"
              class="form-control"
              readonly
            />
          </div>

          <div class="mb-3">
            <label for="triwulan">Triwulan</label>
            <select id="triwulan" v-model="triwulan" class="form-select">
              <option value="">Pilih Triwulan</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="tahun">Tahun</label>
            <select id="tahun" v-model="tahun" class="form-select">
              <option value="">Pilih Tahun</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="fileUpload">File Upload</label>
            <input
              type="file"
              id="fileUpload"
              @change="(e) => fileUpload.value = e.target.files[0]"
              class="form-control"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
