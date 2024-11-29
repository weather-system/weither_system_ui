<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'
import Swal from 'sweetalert2'
import MainWrapper from '@/components/MainWrapper.vue'

const formData = ref({
  management_efforts: [],
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
const fetchIpalData = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get(
      `/api/company_ipals/${ipalId}`,
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
const removeChemical = async (detailId, index) => {
  if (!$loading.isActive) {
    const confirmation = await Swal.fire({
      title: 'Anda yakin ?',
      text: 'Aksi ini tidak dapat dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak',
    })

    if (confirmation.isConfirmed) {
      const loader = $loading.show() // Show loader
      try {
        const response = await axios.delete(
          `/api/ipal-details/${detailId}`,
        )
        if (response.status === 200) {
          // Remove the item from the local list (UI update)
          formData.value.ipal_details.splice(index, 1)
          Swal.fire('Deleted!', 'Data Berhasil Dihapus.', 'success')
        } else {
          Swal.fire('Error!', 'Data Gagal Dihapus.', 'error')
        }
      } catch (error) {
        console.error('Error during delete operation:', error)
        Swal.fire(
          'Error!',
          'An error occurred while deleting the data.',
          'error',
        )
      } finally {
        loader.hide() // Hide loader after operation
      }
    }
  }
}

const removeEffort = async (detailId, index) => {
  if (!$loading.isActive) {
    const confirmation = await Swal.fire({
      title: 'Anda yakin ?',
      text: 'Aksi ini tidak dapat dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak',
    })

    if (confirmation.isConfirmed) {
      const loader = $loading.show() // Show loader
      try {
        const response = await axios.delete(
          `/api/management_efforts/${detailId}`,
        )
        if (response.status === 200) {
          // Remove the item from the local list (UI update)
          formData.value.management_efforts.splice(index, 1)
          Swal.fire('Deleted!', 'Data Berhasil Dihapus.', 'success')
        } else {
          Swal.fire('Error!', 'Data Gagal Dihapus.', 'error')
        }
      } catch (error) {
        console.error('Error during delete operation:', error)
        Swal.fire(
          'Error!',
          'Terjadi Kesalahan.',
          'error',
        )
      } finally {
        loader.hide() // Hide loader after operation
      }
    }
  }
}
const addChemical = () => {
  formData.value.ipal_details.push({
    chemicals_used: '',
    use_of_chemicals: '',
    unit_in_use_of_chemicals: '',
  })
}
const updateIpalDetails = async detailId => {
  if (!$loading.isActive) {
    // Prevents repeated loading states
    const loader = $loading.show()
    try {
      const detailToUpdate = formData.value.ipal_details.find(
        detail => detail.id === detailId,
      )
      if (!detailToUpdate) {
        throw new Error('Detail not found')
      }
      const updatedDetail = {
        chemicals_used: detailToUpdate.chemicals_used,
        use_of_chemicals: detailToUpdate.use_of_chemicals,
        unit_in_use_of_chemicals: detailToUpdate.unit_in_use_of_chemicals,
      }

      // Make API request to update the specific detail
      const response = await axios.put(
        `/api/ipal-details/${detailId}`,
        updatedDetail,
      )

      // Show a success alert using Swal
      Swal.fire({
        title: 'Success!',
        text: 'IPAL detail updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    } catch (error) {
      console.error('Error updating IPAL detail:', error)
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update IPAL detail.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } finally {
      loader.hide()
    }
  }
}

const updateEffort = async detailId => {
  if (!$loading.isActive) {
    const loader = $loading.show()
    try {
      const detailToUpdate = formData.value.management_efforts.find(
        detail => detail.id === detailId,
      )
      if (!detailToUpdate) {
        throw new Error('Detail not found')
      }
      const updatedDetail = {
        recycling_effort: detailToUpdate.recycling_effort,
      }

      console.log('Sending update for:', updatedDetail) // Log payload

      // Make API request to update the specific detail
      const response = await axios.put(
        `/api/management_efforts/${detailId}`,
        updatedDetail,
      )

      // Log API response
      console.log('API Response:', response.data)

      // Show success alert using Swal
      Swal.fire({
        title: 'Success!',
        text: 'Upaya Pengelolaan updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    } catch (error) {
      console.error('Error updating IPAL detail:', error)
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update IPAL detail.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } finally {
      loader.hide()
    }
  }
}

const companyIpalId = route.params.id
const isModalEffortOpen = ref(false)
const isModalOpen = ref(false)
const newChemical = ref({
  chemicals_used: '',
  use_of_chemicals: '',
  unit_in_use_of_chemicals: '',
  company_ipal_id: companyIpalId,
})
const newEffort = ref({
  recycling_effort: '',
  company_ipal_id: companyIpalId,
})
const openModalEffort = () => {
  isModalEffortOpen.value = true
}
const openModal = () => {
  isModalOpen.value = true
}
console.log(isModalEffortOpen.value)
const closeModal = () => {
  isModalOpen.value = false
  newChemical.value.chemicals_used = ''
  newChemical.value.use_of_chemicals = ''
  newChemical.value.unit_in_use_of_chemicals = ''
}
const closeModalEffort = () => {
  isModalEffortOpen.value = false
  newEffort.value.recycling_effort = ''
}
const saveNewChemical = async () => {
  if (!$loading.isActive) {
    const loader = $loading.show()
    try {
      const response = await axios.post(
        '/api/ipal-details',
        {
          chemicals_used: newChemical.value.chemicals_used,
          use_of_chemicals: newChemical.value.use_of_chemicals,
          unit_in_use_of_chemicals: newChemical.value.unit_in_use_of_chemicals,
          company_ipal_id: newChemical.value.company_ipal_id,
        },
      )
      if (response.status === 200 || response.status === 201) {
        console.log('Data successfully saved:', response.data)
        // Show a success SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'Data berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        closeModal()
        fetchIpalData()
      } else {
        console.error('Failed to save data:', response.data)
        // Show an error SweetAlert
        Swal.fire({
          title: 'Error!',
          text: 'Failed to save data.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        })
      }
    } catch (error) {
      console.error('Error during save operation:', error)
      Swal.fire({
        title: 'Oops!',
        text: 'An error occurred while saving the data.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } finally {
      loader.hide() // Hide loader after operation
    }
  }
}

const saveNewEffort = async () => {
  if (!$loading.isActive) {
    const loader = $loading.show()
    try {
      const response = await axios.post(
        '/api/management_efforts',
        {
          recycling_effort: newEffort.value.recycling_effort,
          company_ipal_id: newEffort.value.company_ipal_id,
        },
      )
      if (response.status === 200 || response.status === 201) {
        console.log('Data successfully saved:', response.data)
        // Show a success SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'Data berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        closeModal()
        fetchIpalData()
      } else {
        console.error('Failed to save data:', response.data)
        // Show an error SweetAlert
        Swal.fire({
          title: 'Error!',
          text: 'Failed to save data.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        })
      }
    } catch (error) {
      console.error('Error during save operation:', error)
      Swal.fire({
        title: 'Oops!',
        text: 'An error occurred while saving the data.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } finally {
      loader.hide() // Hide loader after operation
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
      `/api/company_ipals/${ipalId}`,
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

const fetchCompanyLicences = async () => {
  const loader = $loading.show()
  try {
    const response = await axios.get(
      '/api/company_licence',
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

const uploadFileIzinPerusahaan = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    formData.value.file_izin_perusahaan = url
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
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Jenis IPAL</label>
                  <select class="form-control" v-model="formData.type" required>
                    <option value="" disabled>Pilih Jenis IPAL</option>
                    <option value="Domestik">Domestik</option>
                    <option value="Industri">Industri</option>
                    <option value="Integrasi">Integrasi</option>
                  </select>
                </div>
              </div>
              <!-- <div class="col-md-8">
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
              </div> -->
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">No. Izin Perusahaan</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.no_izin_perusahaan"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">File Izin Perusahaan</label>
                  <input
                    type="file"
                    class="form-control"
                    @change="uploadFileIzinPerusahaan"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Acuan Baku Mutu</label>
                  <select
                    class="form-control"
                    v-model="formData.acuan_baku_mutu"
                  >
                    <option value="Permen LHK No. 5 Tahun 2014 Tentang Baku Mutu Air Limbah">Permen LHK No. 5 Tahun 2014 Tentang Baku Mutu Air Limbah</option>
                    <option value="Permen LHK No. 68 Tahun 2016 Tentang Baku Mutu Air Limbah Domestik">Permen LHK No. 68 Tahun 2016 Tentang Baku Mutu Air Limbah Domestik</option>
                    <option value="Permen LHK No. 16 Tahun 2019 Tentang Baku Mutu Air Limbah">Permen LHK No. 16 Tahun 2019 Tentang Baku Mutu Air Limbah</option>
                  </select>
                </div>
              </div>
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
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Debit Air Limbah Yang Diijinkan</label
                  >
                  <div class ="form-duration">
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.permissible_waste_water_discharge"
                  />
                  <span class="mins">m2</span>
                </div>
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
            <div>
              <table class="table table-bordered" style="table-layout: fixed">
                <thead>
                  <tr>
                    <th style="width: 50px">No</th>
                    <th style="width: 200px">Upaya Pengelolaan</th>
                    <th style="width: 100px">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!formData.management_efforts.length">
                    <td colspan="3" class="text-center">
                      Data Tidak Ditemukan
                    </td>
                  </tr>
                  <tr
                    v-for="(detail, index) in formData.management_efforts"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        v-model="detail.recycling_effort"
                        @blur="updateEffort(detail.id)"
                        placeholder="Masukkan Upaya Pengelolaan"
                        style="word-wrap: break-word; overflow-wrap: break-word"
                      />
                    </td>
                    <td>
                      <button
                        @click="removeEffort(detail.id, index)"
                        class="btn btn-danger"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end mt-4 mb-5">
                <button
                  @click="openModalEffort"
                  class="btn btn-primary"
                  type="button"
                >
                  Tambah Data Baru
                </button>
              </div>
              <div v-if="isModalEffortOpen" class="modal-backdrop">
                <div class="overlay"></div>
                <div class="modal show" tabindex="-1" style="display: block">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5>Tambah Data Upaya Pengelolaan</h5>
                        <button
                          @click="closeModalEffort"
                          class="btn-close"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label>Upaya Pengelolaan</label>
                          <input
                            type="text"
                            v-model="newEffort.recycling_effort"
                            class="form-control"
                            placeholder="Masukkan Bahan Kimia Yang Digunakan"
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button @click="saveNewEffort" class="btn btn-primary">
                          Simpan
                        </button>
                        <button
                          @click="closeModalEffort"
                          class="btn btn-secondary"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="photo">Upload Persetujuan Teknis IPAL</label>
                  <input type="file" @change="uploadNIB" class="form-control" />
                  <small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
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
              <div class="table-responsive">
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
                    <tr v-if="!formData.ipal_details.length">
                      <td colspan="5" class="text-center">
                        Data Tidak Ditemukan
                      </td>
                    </tr>
                    <tr
                      v-for="(detail, index) in formData.ipal_details"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="detail.chemicals_used"
                          @blur="updateIpalDetails(detail.id)"
                          placeholder="Masukkan Bahan Kimia"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="detail.use_of_chemicals"
                          @blur="updateIpalDetails(detail.id)"
                          placeholder="Masukkan Penggunaan Bahan Kimia"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="detail.unit_in_use_of_chemicals"
                          @blur="updateIpalDetails(detail.id)"
                          placeholder="Masukkan Satuan"
                          style="min-width: 120px"
                        />
                      </td>
                      <td>
                        <button
                          @click="removeChemical(detail.id, index)"
                          class="btn btn-danger"
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-end mt-4 mb-5">
                <button
                  @click="openModal"
                  class="btn btn-primary"
                  type="button"
                >
                  Tambah Data Baru
                </button>
              </div>
              <div v-if="isModalOpen" class="modal-backdrop">
                <div class="overlay"></div>
                <div class="modal show" tabindex="-1" style="display: block">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5>Tambah Data Penggunakan Bahan Kimia</h5>
                        <button
                          @click="closeModal"
                          class="btn-close"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label>Bahan Kimia Yang Digunakan</label>
                          <input
                            type="text"
                            v-model="newChemical.chemicals_used"
                            class="form-control"
                            placeholder="Masukkan Bahan Kimia Yang Digunakan"
                          />
                        </div>
                        <div class="form-group">
                          <label>Pemakaian Bahan Kimia</label>
                          <input
                            type="text"
                            v-model="newChemical.use_of_chemicals"
                            class="form-control"
                            placeholder="Masukkan Pemakaian Bahan Kimia"
                          />
                        </div>
                        <div class="form-group">
                          <label>Satuan</label>
                          <input
                            type="text"
                            v-model="newChemical.unit_in_use_of_chemicals"
                            class="form-control"
                            placeholder="Masukkan Satuan"
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          @click="saveNewChemical"
                          class="btn btn-primary"
                        >
                          Simpan
                        </button>
                        <button @click="closeModal" class="btn btn-secondary">
                          Batal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label"
                    >Badan Air yang Menerima Limbah Cair</label
                  >
                  <select
                    class="form-control"
                    v-model="formData.water_bodies_receiving_liquid_waste"
                  >
                    <option value="Cihaur">Cihaur</option>
                    <option value="Cibereum">Cibereum</option>
                    <option value="Cisangkan">Cisangkan</option>
                    <option value="Cimahi">Cimahi</option>
                    <option value="Sungai Cilember">Sungai Cilember</option>
                    <option value="Pemanfaatan">Pemanfaatan</option>
                  </select>
                </div>
              </div>
              <!-- <div class="col-md-6">
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
              </div> -->
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
                  <select
                    class="form-control"
                    v-model="formData.unit_in_amount_of_mud_sludge"
                  >
                    <option value="Ton">Ton</option>
                    <option value="Kg">Kg</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-form-label"
                >Penanganan Lumpur Selanjutnya</label
              >
              <select
                type="text"
                class="form-control"
                v-model="formData.further_sludge_handling"
              >
                <option value="Diserahkan pada pihak ketiga">Diserahkan pada pihak ketiga</option>
                <option value="Dilakukan pengolahan lumpur">Dilakukan pengolahan lumpur</option>
              </select>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="field-btns d-flex justify-content-between">
                  <div>
                    <button
                      class="btn btn-primary next_btn"
                      @click="updateCompanyDetails"
                    >
                      Update
                    </button>
                    <router-link to="/Data/IPAL" class="btn btn-secondary m-2"
                      >Kembali</router-link
                    >
                  </div>
                </div>
              </div>
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

.table {
  width: 100%;
  margin-top: 20px;
}
.btn {
  margin-left: 5px;
}

.modal-backdrop {
  display: block;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.modal-dialog {
  padding-top: 100px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.modal-content {
  background-color: white;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>
