<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MainWrapper from '@/components/MainWrapper.vue'

const router = useRouter()

const companyDetailId = ref('')
const triwulan = ref('')
const tahun = ref('')
const fileUpload = ref(null)
const status = ref('Ajuan Baru')

const handleSubmit = () => {
  // Perform submission logic here, e.g., sending data to API
  console.log({
    company_detail_id: companyDetailId.value,
    triwulan: triwulan.value,
    tahun: tahun.value,
    file_upload: fileUpload.value,
    status: status.value
  })
  router.push('/PengelolaanLimbahB3')
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
            <input type="text" id="companyDetailId" v-model="companyDetailId" class="form-control" />
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
            <input type="file" id="fileUpload" @change="(e) => fileUpload.value = e.target.files[0]" class="form-control" />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </MainWrapper>
</template>
