<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const route = useRoute()

const formData = ref({
  ipalTypes: [], // Holds the selected IPAL types to be displayed
})
const errorMessage = ref('') // Holds error message if no data is found
const currentPage = ref(1) // Current page in pagination
const perPage = 1 // Number of items per page (1 IPAL type per page)

// Fetch company types with pagination
const fetchCompanyTypes = async () => {
  const loader = $loading.show()
  const companyId = route.params.company_detail_id
  try {
    const response = await axios.get(`http://localhost:8000/api/ipal/${companyId}`)
    console.log('Full API Response:', response) // Log entire response for verification

    // Mengambil data langsung dari response.data
    const data = response.data || []
    if (data.length === 0) {
      errorMessage.value = 'Data tidak ditemukan' // Update error message for empty data
      formData.value.ipalTypes = []
    } else {
      // Memetakan jenis IPAL dari data yang diambil
      formData.value.ipalTypes = data.map((item) => item.type)
      errorMessage.value = ''
      // Ensure currentPage does not exceed available types
      if (currentPage.value > formData.value.ipalTypes.length) {
        currentPage.value = formData.value.ipalTypes.length
      }
    }
    console.log(`Fetched Company Types for ID ${companyId}:`, formData.value.ipalTypes)
  } catch (error) {
    console.error('Error fetching company types:', error)
    // Remove the error message here to avoid showing on API error
  } finally {
    loader.hide()
  }
}

// Update company types API call
const updateCompanyDetails = async () => {
  const loader = $loading.show()
  const companyId = route.params.company_detail_id
  try {
    const updatedTypes = [{
      company_detail_id: companyId,
      type: formData.value.ipalTypes[currentPage.value - 1], // Get the type for the current page
      id: currentPage.value // Update ID based on current page
    }]
    await axios.put(`http://localhost:8000/api/ipal/${companyId}`, updatedTypes)
    alert('Company type updated successfully!')
  } catch (error) {
    console.error('Error updating company types:', error)
    alert('Failed to update company type.')
  } finally {
    loader.hide()
  }
}

// Fetch company types on mount
onMounted(() => {
  fetchCompanyTypes(currentPage.value)
})

// Pagination functions
const nextPage = () => {
  if (currentPage.value < formData.value.ipalTypes.length) {
    currentPage.value += 1
    fetchCompanyTypes(currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    fetchCompanyTypes(currentPage.value)
  }
}
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div class="content-page-header mb-2">
          <h3>Persetujuan Teknis IPAL</h3>
        </div>

        <form @submit.prevent="updateCompanyDetails">
          <!-- Display error message if no data is found -->
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <!-- Display current IPAL Type -->
          <div class="form-group" v-if="formData.ipalTypes.length > 0">
            <label class="col-form-label">Jenis IPAL {{ currentPage }}</label>
            <select class="form-control" v-model="formData.ipalTypes[currentPage - 1]" required>
              <option value="" disabled>Pilih Jenis IPAL</option>
              <option value="Domestik">Domestik</option>
              <option value="Industri">Industri</option>
              <option value="Integrasi">Integrasi</option>
            </select>
          </div>
          <div v-else>
            <p>Data tidak ditemukan</p>
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="row">
            <div class="col-md-12">
              <div class="field-btns">
                <button class="btn btn-primary next_btn" type="submit" v-if="formData.ipalTypes.length > 0">Simpan</button>
                <router-link to="/Data/Company" class="btn btn-secondary m-2">Kembali</router-link>
              </div>
            </div>
          </div>
        </form>

        <!-- Pagination Controls -->
        <div class="pagination-controls mt-3" v-if="formData.ipalTypes.length > 0">
          <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">Previous</button>
          <span>Page {{ currentPage }} of {{ formData.ipalTypes.length }}</span>
          <button @click="nextPage" :disabled="currentPage === formData.ipalTypes.length" class="btn btn-secondary">Next</button>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}
</style>
