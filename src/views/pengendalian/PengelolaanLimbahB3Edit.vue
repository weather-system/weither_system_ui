<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MainWrapper from '@/components/MainWrapper.vue'

const router = useRouter()
const route = useRoute()

const companyDetailId = ref('')
const triwulan = ref('')
const tahun = ref('')
const fileUpload = ref(null)
const status = ref('Ajuan Baru')

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await fetch(`/api/pengelolaan-limbah-b3/${id}`)
    const data = await response.json()
    companyDetailId.value = data.company_detail_id
    triwulan.value = data.triwulan
    tahun.value = data.tahun
    status.value = data.status
  } catch (error) {
    console.error('Gagal memuat data:', error)
  }
})

const handleUpdate = async () => {
  const formData = new FormData()
  formData.append('company_detail_id', companyDetailId.value)
  formData.append('triwulan', triwulan.value)
  formData.append('tahun', tahun.value)
  formData.append('file_upload', fileUpload.value)
  formData.append('status', status.value)

  try {
    const response = await fetch(`/api/pengelolaan-limbah-b3/${route.params.id}`, {
      method: 'PUT',
      body: formData
    })
    if (response.ok) {
      router.push('/pengelolaan-limbah-b3')
    } else {
      console.error('Gagal memperbarui data')
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
  }
}
</script>

<template>
  <MainWrapper>
    <div class="content">
      <h3>Edit Pengelolaan Limbah B3</h3>
      <form @submit.prevent="handleUpdate">
        <div class="mb-3">
          <label for="companyDetailId">Company Detail ID</label>
          <input id="companyDetailId" v-model="companyDetailId" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="triwulan">Triwulan</label>
          <select id="triwulan" v-model="triwulan" class="form-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="tahun">Tahun</label>
          <select id="tahun" v-model="tahun" class="form-select">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="fileUpload">File Upload</label>
          <input type="file" id="fileUpload" @change="e => fileUpload.value = e.target.files[0]" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </MainWrapper>
</template>
