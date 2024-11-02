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
  company_licence_id: '', // Holds the selected company license ID
})
const licenseOptions = ref([]) // Holds the license options fetched from the API
const errorMessage = ref('') // Holds error message if no data is found
const currentPage = ref(1) // Current page in pagination
const perPage = 1 // Number of items per page (1 IPAL type per page)

// Fetch company types with pagination
const fetchCompanyTypes = async () => {
  const loader = $loading.show()
  const companyId = route.params.company_detail_id
  try {
    const response = await axios.get(
      `http://localhost:8000/api/ipal/${companyId}`,
    )
    console.log('Full API Response:', response) // Log entire response for verification

    const data = response.data || []
    if (data.length === 0) {
      errorMessage.value = 'Data tidak ditemukan' // Update error message for empty data
      formData.value.ipalTypes = []
    } else {
      formData.value.ipalTypes = data.map(item => item.type)
      errorMessage.value = ''
      if (currentPage.value > formData.value.ipalTypes.length) {
        currentPage.value = formData.value.ipalTypes.length
      }
    }
    console.log(
      `Fetched Company Types for ID ${companyId}:`,
      formData.value.ipalTypes,
    )
  } catch (error) {
    console.error('Error fetching company types:', error)
  } finally {
    loader.hide()
  }
}

// Fetch company license IDs
const fetchCompanyLicences = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get('http://localhost:8000/api/company_licence')
    licenseOptions.value = response.data || [] // Store the fetched licenses
  } catch (error) {
    console.error('Error fetching company licenses:', error)
  } finally {
    loader.hide()
  }
}

// Update company types API call
const updateCompanyDetails = async () => {
  const loader = $loading.show()
  const companyId = route.params.company_detail_id
  try {
    const updatedTypes = [
      {
        company_detail_id: companyId,
        type: formData.value.ipalTypes[currentPage.value - 1], // Get the type for the current page
        id: currentPage.value, // Update ID based on current page
      },
    ]
    await axios.put(`http://localhost:8000/api/ipal/${companyId}`, updatedTypes)
    alert('Company type updated successfully!')
  } catch (error) {
    console.error('Error updating company types:', error)
    alert('Failed to update company type.')
  } finally {
    loader.hide()
  }
}

// Fetch company types and licenses on mount
onMounted(() => {
  fetchCompanyTypes()
  fetchCompanyLicences()
})

// Pagination functions
const nextPage = () => {
  if (currentPage.value < formData.value.ipalTypes.length) {
    currentPage.value += 1
    fetchCompanyTypes()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    fetchCompanyTypes()
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

        <form v-if="formData.ipalTypes.length > 0" @submit.prevent="updateCompanyDetails">
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <div class="form-group">
            <label class="col-form-label">Jenis IPAL {{ currentPage }}</label>
            <select
              class="form-control"
              v-model="formData.ipalTypes[currentPage - 1]"
              required
            >
              <option value="" disabled>Pilih Jenis IPAL</option>
              <option value="Domestik">Domestik</option>
              <option value="Industri">Industri</option>
              <option value="Integrasi">Integrasi</option>
            </select>
          </div>
          <div class="form-group">
              <label class="col-form-label">ID Lisensi Perusahaan</label>
              <select
                class="form-control"
                v-model="formData.company_licence_id"
                required
              >
                <option value="" disabled>Pilih ID Lisensi Perusahaan</option>
                <option v-for="license in licenseOptions" :key="license.id" :value="license.id">
                  {{ license.license_number }} - {{ license.type }} - {{ license.issuing_agency }} 
                </option>
              </select>
            </div>
          <div class="form-group">
            <label class="col-form-label">Tahun Pembuatan IPAL</label>
            <input type="number" class="form-control" v-model="formData.year_of_manufacture_of_ipal" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Kapasitas IPAL</label>
            <input type="number" class="form-control" v-model="formData.capacity_ipal" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Satuan Kapasitas</label>
            <input type="text" class="form-control" v-model="formData.unit_in_capacity" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Pembuangan Air Limbah yang Diperbolehkan</label>
            <input type="text" class="form-control" v-model="formData.permissible_waste_water_discharge" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Sistem IPAL</label>
            <input type="text" class="form-control" v-model="formData.system_ipal" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Sumber Air Limbah</label>
            <input type="text" class="form-control" v-model="formData.waste_water_source" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Longitude</label>
            <input type="text" class="form-control" v-model="formData.longitude" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Latitude</label>
            <input type="text" class="form-control" v-model="formData.latitude" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Upaya Daur Ulang</label>
            <input type="text" class="form-control" v-model="formData.recycle_efforts" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Alat Ukur Pembuangan Limbah Masuk</label>
            <input type="text" class="form-control" v-model="formData.waste_discharge_measuring_instrument_inlet" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Nama Alat Ukur Pembuangan Limbah Masuk</label>
            <input type="text" class="form-control" v-model="formData.waste_discharge_measuring_instrument_inlet_name" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Alat Ukur Pembuangan Limbah Keluar</label>
            <input type="text" class="form-control" v-model="formData.waste_discharge_measuring_instrument_outlet" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Nama Alat Ukur Pembuangan Limbah Keluar</label>
            <input type="text" class="form-control" v-model="formData.waste_discharge_measuring_instrument_outlet_name" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Catatan Desain IPAL</label>
            <input type="text" class="form-control" v-model="formData.ipal_design_note" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Badan Air yang Menerima Limbah Cair</label>
            <input type="text" class="form-control" v-model="formData.water_bodies_receiving_liquid_waste" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Tempat Penyimpanan Lumpur IPAL</label>
            <input type="text" class="form-control" v-model="formData.ipal_sludge_storage_site" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Jumlah Lumpur</label>
            <input type="number" class="form-control" v-model="formData.amount_of_mud_sludge" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Satuan Jumlah Lumpur</label>
            <input type="text" class="form-control" v-model="formData.unit_in_amount_of_mud_sludge" />
          </div>
          <div class="form-group">
            <label class="col-form-label">Penanganan Lumpur Selanjutnya</label>
            <input type="text" class="form-control" v-model="formData.further_sludge_handling" />
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="field-btns">
                <button
                  class="btn btn-primary next_btn"
                  type="submit"
                  v-if="formData.ipalTypes.length > 0"
                >
                  Update
                </button>
                <router-link to="/Data/Company" class="btn btn-secondary m-2"
                  >Kembali</router-link
                >
              </div>
              <div
                class="pagination-controls mt-1"
                v-if="formData.ipalTypes.length > 0"
              >
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="btn btn-secondary"
                >
                  Previous
                </button>
                <span
                  >Page {{ currentPage }} of
                  {{ formData.ipalTypes.length }}</span
                >
                <button
                  @click="nextPage"
                  :disabled="currentPage === formData.ipalTypes.length"
                  class="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
        <div v-else>
          <p class="alert alert-warning">Data tidak ditemukan</p>
          <router-link to="/Data/Company" class="btn btn-secondary m-2"
                  >Kembali</router-link
                >
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
