<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'

const $loading = useLoading()
const route = useRoute()

const formData = ref({
  ipalTypes: [],
  system_ipal: [],
  company_licence_id: '', // Holds the selected company license ID
  waste_discharge_measuring_instrument_inlet_name: '', // Holds the inlet measuring instrument name
  waste_discharge_measuring_instrument_outlet_name: '', // Holds the outlet measuring instrument name
  year_of_manufacture_of_ipal: '',
  capacity_ipal: '',
  unit_in_capacity: '',
  permissible_waste_water_discharge: '',
  waste_water_source: '',
  recycle_efforts: '',
  longitude: '',
  latitude: '',
  water_bodies_receiving_liquid_waste: '',
  ipal_sludge_storage_site: '',
  amount_of_mud_sludge: '',
})
const licenseOptions = ref([]) // Holds the license options fetched from the API
const errorMessage = ref('') // Holds error message if no data is found
const currentPage = ref(1) // Current page in pagination
const perPage = 1 // Number of items per page (1 IPAL type per page)

// Checkbox states
const isInletChecked = ref(false)
const isOutletChecked = ref(false)

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
    const response = await axios.get(
      'http://localhost:8000/api/company_licence',
    )
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
    const updatedType = {
      ...formData.value,
      company_detail_id: companyId,
      type: formData.value.ipalTypes[currentPage.value - 1], // Get the type for the current page
      id: currentPage.value,
      system_ipal: formData.value.system_ipal.join(',')
    }
    console.log(updatedType)
    // Send the request with the JSON data
    const response = await axios.put(
      `http://localhost:8000/api/company_ipals/${currentPage.value}`,
      updatedType,
      {
        headers: {
          'Content-Type': 'application/json', // Explicitly set the Content-Type to application/json
        },
      },
    )

    alert(response.data.message) // Display the success message from the backend
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

// Toggle functions for inlet and outlet checkboxes
const toggleInlet = () => {
  if (!isInletChecked.value) {
    formData.value.waste_discharge_measuring_instrument_inlet_name = ''
  }
}

const toggleOutlet = () => {
  if (!isOutletChecked.value) {
    formData.value.waste_discharge_measuring_instrument_outlet_name = ''
  }
}

// Placeholder function for file upload (to be implemented)
const uploadNIB = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    urlNIB.value = url
    form.value.ipal_design_note = urlNIB.value
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
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Persetujuan Teknis IPAL</h3>
            </div>
            <form
              v-if="formData.ipalTypes.length > 0"
              @submit.prevent="updateCompanyDetails"
            >
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Jenis IPAL {{ currentPage }}</label
                    >
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
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <label class="col-form-label">Izin Perusahaan</label>
                    <select
                      class="form-control"
                      v-model="formData.company_licence_id"
                      required
                    >
                      <option value="">Pilih Data Izin</option>
                      <option
                        v-for="license in licenseOptions"
                        :key="license.id"
                        :value="license.id"
                      >
                        {{ license.license_number }} - {{ license.type }} -
                        {{ license.issuing_agency }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Tahun Pembuatan IPAL</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.year_of_manufacture_of_ipal"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Kapasitas IPAL</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.capacity_ipal"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Satuan Kapasitas</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.unit_in_capacity"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Debit Air Limbah Yang Diijinkan</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.permissible_waste_water_discharge"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Sumber Air Limbah</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.waste_water_source"
                    />
                  </div>
                </div>
              </div>
              <div class="row service-cont">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="col-form-label">Sistem IPAL</label>
                    <div class="d-flex flex-wrap">
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            value="Fisika"
                            v-model="formData.system_ipal"
                          />
                          Fisika
                        </label>
                      </div>
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            value="Kimia"
                            v-model="formData.system_ipal"
                          />
                          Kimia
                        </label>
                      </div>
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            value="Biologi"
                            v-model="formData.system_ipal"
                          />
                          Biologi
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Longitude</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.longitude"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label">Latitude</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.latitude"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label">Upaya Daur Ulang</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.recycle_efforts"
                />
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="col-form-label">Alat Ukur Debit Limbah</label>
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="inletCheckbox"
                            v-model="isInletChecked"
                            @change="toggleInlet"
                          />
                          Inlet</label
                        >
                      </div>
                      <div class="col-md-6">
                        <div v-if="isInletChecked" class="form-group">
                          <input
                            type="text"
                            class="form-control input-dark-placeholder"
                            v-model="
                              formData.waste_discharge_measuring_instrument_inlet_name
                            "
                            placeholder="Masukkan Nama Alat Ukur Pembuangan Limbah Masuk"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="outletCheckbox"
                            v-model="isOutletChecked"
                            @change="toggleOutlet"
                          />
                          Outlet</label
                        >
                      </div>
                      <div class="col-md-6">
                        <div v-if="isOutletChecked" class="form-group">
                          <input
                            type="text"
                            class="form-control input-dark-placeholder"
                            placeholder="Masukkan Nama Alat Ukur Pembuangan Limbah Keluar"
                            v-model="
                              formData.waste_discharge_measuring_instrument_outlet_name
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="photo">Upload Nota Design IPAL</label>
                    <input
                      type="file"
                      @change="uploadNIB"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Badan Air yang Menerima Limbah Cair</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.water_bodies_receiving_liquid_waste"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-form-label"
                      >Tempat Penampungan Lumpur IPAL</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.ipal_sludge_storage_site"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="col-form-label">Jumlah Lumpur</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.amount_of_mud_sludge"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="col-form-label">Satuan Jumlah Lumpur</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.unit_in_amount_of_mud_sludge"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label"
                  >Penanganan Lumpur Selanjutnya</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.further_sludge_handling"
                />
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="field-btns d-flex justify-content-between">
                    <div>
                      <button
                        class="btn btn-primary next_btn"
                        type="submit"
                        v-if="formData.ipalTypes.length > 0"
                      >
                        Update
                      </button>
                      <router-link
                        to="/Data/Company"
                        class="btn btn-secondary m-2"
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
                      <span>
                        Page {{ currentPage }} of
                        {{ formData.ipalTypes.length }}
                      </span>
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
