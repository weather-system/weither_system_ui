<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'
import Swal from 'sweetalert2'
import MainWrapper from '@/components/MainWrapper.vue'

const formData = ref({
  ipal_details: [],
  ipalTypes: [],
  system_ipal: '',
  company_licence_id: '',
  waste_discharge_measuring_instrument_inlet_name: '',
  waste_discharge_measuring_instrument_outlet_name: '',
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
  waste_discharge_measuring_instrument_inlet: null,
  waste_discharge_measuring_instrument_outlet: null,
  ipal_design_note: '',
})

const licenseOptions = ref([])
const errorMessage = ref('')
const $loading = useLoading()
const route = useRoute()
const router = useRouter()
const ipalId = route.params.id
const urlNIB = ref('')
const isInletChecked = ref(false)
const isOutletChecked = ref(false)

// Fetch IPAL data for editing
const fetchIpalData = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get(
      `http://localhost:8000/api/company_ipals/${ipalId}`,
    )
    const data = response.data.data
    if (data) {
      Object.assign(formData.value, data)
      formData.value.ipalTypes = data.system_ipal
        ? data.system_ipal.split(',')
        : []
      isInletChecked.value =
        data.waste_discharge_measuring_instrument_inlet === 'Ada'
      isOutletChecked.value =
        data.waste_discharge_measuring_instrument_outlet === 'Ada'
    } else {
      errorMessage.value = 'Data tidak ditemukan'
    }
  } catch (error) {
    console.error('Error fetching IPAL data:', error)
    errorMessage.value = 'Gagal mengambil data IPAL.'
  } finally {
    loader.hide()
  }
}
const removeChemical = (index) => {
  formData.value.ipal_details.splice(index, 1)
}
const addChemical = () => {
  formData.value.ipal_details.push({
    chemicals_used: '',
    use_of_chemicals: '',
    unit_in_use_of_chemicals: '',
  })
}
const updateIpalDetails = async (detailId) => {
  if (!$loading.isActive) {  // Prevents repeated loading states
    const loader = $loading.show()
    try {
      const detailToUpdate = formData.value.ipal_details.find(detail => detail.id === detailId)
      if (!detailToUpdate) {
        throw new Error('Detail not found')
      }

      // Prepare data for the update request
      const updatedDetail = {
        chemicals_used: detailToUpdate.chemicals_used,
        use_of_chemicals: detailToUpdate.use_of_chemicals,
        unit_in_use_of_chemicals: detailToUpdate.unit_in_use_of_chemicals,
      }

      // Make API request to update the specific detail
      const response = await axios.put(
        `http://localhost:8000/api/ipal-details/${detailId}`,
        updatedDetail
      )

      // Show a success alert using Swal
      Swal.fire({
        title: 'Success!',
        text: 'IPAL detail updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      })

    } catch (error) {
      console.error('Error updating IPAL detail:', error)
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update IPAL detail.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      loader.hide()
    }
  }
}


const updateCompanyDetails = async () => {
  const loader = $loading.show()
  try {
    formData.value.system_ipal = formData.value.ipalTypes.join(',')
    formData.value.waste_discharge_measuring_instrument_inlet =
      isInletChecked.value ? 'Ada' : null
    formData.value.waste_discharge_measuring_instrument_outlet =
      isOutletChecked.value ? 'Ada' : null

    const updatedType = {
      ...formData.value,
      id: ipalId,
    }
    console.log('dataaaaaa :', updatedType)
    await axios.put(
      `http://localhost:8000/api/company_ipals/${ipalId}`,
      updatedType,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    Swal.fire('Berhasil', 'Data IPAL berhasil diperbarui.', 'success')
    router.push('/Data/Ipal')
  } catch (error) {
    console.error('Error updating company details:', error)
    Swal.fire('Error', 'Gagal memperbarui data IPAL.', 'error')
  } finally {
    loader.hide()
  }
}

// Fetch company licenses for the dropdown
const fetchCompanyLicences = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get(
      'http://localhost:8000/api/company_licence',
    )
    licenseOptions.value = response.data || []
  } catch (error) {
    console.error('Error fetching company licenses:', error)
  } finally {
    loader.hide()
  }
}

// Fetch data when component mounts
onMounted(() => {
  fetchIpalData()
  fetchCompanyLicences()
})

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

const uploadNIB = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    urlNIB.value = url
    formData.value.ipal_design_note = urlNIB.value
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
              <h3>Edit Persetujuan Teknis IPAL</h3>
            </div>
            <form @submit.prevent="updateCompanyDetails">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="col-form-label">Jenis IPAL</label>
                    <select
                      class="form-control"
                      v-model="formData.type"
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
              <div class="row service-count">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="col-form-label">Sistem Ipal</label>
                    <div class="d-flex flex-wrap">
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="checkboxFisika"
                            value="Fisika"
                            v-model="formData.ipalTypes"
                          />
                          Fisika
                        </label>
                      </div>
                      <div class="form-check me-3">
                        <label>
                          <input
                            type="checkbox"
                            id="checkboxKimia"
                            value="Kimia"
                            v-model="formData.ipalTypes"
                          />
                          Kimia
                        </label>
                      </div>
                      <div class="form-check">
                        <label>
                          <input
                            type="checkbox"
                            id="checkboxBiologi"
                            value="Biologi"
                            v-model="formData.ipalTypes"
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
                          Inlet
                        </label>
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
                <div class="col-md-4">
                  <div class="form-group">
                    <label></label>
                    <img :src="formData.ipal_design_note" />
                  </div>
                </div>
              </div>
              <div>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Bahan Kimia Yang Digunakan</th>
                      <th>Pemakaian Bahan Kimia</th>
                      <th>Satuan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
              <tr v-for="(detail, index) in formData.ipal_details" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="detail.chemicals_used"
                    @blur="updateIpalDetails(detail.id)"
                    placeholder="Enter Chemicals Used"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="detail.use_of_chemicals"
                    @blur="updateIpalDetails(detail.id)"
                    placeholder="Enter Use of Chemicals"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    v-model="detail.unit_in_use_of_chemicals"
                    @blur="updateIpalDetails(detail.id)"
                    placeholder="Enter Unit of Chemicals"
                  />
                </td>
                <td>
                  <button @click="removeChemical(index)" class="btn btn-danger">-</button>
                  <button @click="addChemical" class="btn btn-success">+</button>
                </td>
              </tr>
                  </tbody>

                </table>
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
                      <button class="btn btn-primary next_btn" type="submit">
                        Update
                      </button>
                      <router-link to="/Data/IPAL" class="btn btn-secondary m-2"
                        >Kembali</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </form>
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

.table {
  width: 100%;
  margin-top: 20px;
}
.btn {
  margin-left: 5px; /* Adjust spacing between buttons */
}
</style>
