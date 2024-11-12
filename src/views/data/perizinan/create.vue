<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import MainWrapper from '@/components/MainWrapper.vue'

const form = ref({
  type: '',
  license_number: '',
  issuing_agency: '',
  permit_date: '',
  permit_date_expired: '',
  photo: '',
  // Fields based on the selected license type
  building_land_area: '',
  building_floor_area: '',
  survey_letter: '',
  main_traded_goods: '',
  type_of_business: '',
  storage_data_type: '',
  storage_data_volume: '',
  storage_data_source: '',
  wastewater_source: '',
  longitude: '',
  latitude: '',
  treatment_capacity: '',
  unit: '',
  main_business_activity: '',
  status: '',
  allowed_waste_debit: '',
  technical_approval_activity: '',
  technical_details_activity: '',
})

const $loading = useLoading()
const router = useRouter()
const urlNIB = ref('')

const uploadNIB = async e => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    urlNIB.value = url
    form.value.photo = urlNIB.value
    console.log('Uploaded URL:', urlNIB.value)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const submitForm = async () => {
  try {
    await axios.post('http://localhost:8000/api/company_licence', form.value)
    await Swal.fire({
      title: 'Success!',
      text: 'Perizinan berhasil ditambahkan!',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    router.push('/data/perizinan')
  } catch (error) {
    console.error('Error adding license:', error)
    await Swal.fire({
      title: 'Error!',
      text: 'Gagal menambahkan perizinan.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
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
              <h3>Tambah Perizinan</h3>
            </div>
            <form @submit.prevent="submitForm">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="type">Jenis</label>
                    <select v-model="form.type" class="form-control" required>
                      <option disabled value="">Pilih jenis izin</option>
                      <option value="Izin Mendirikan Bangunan">
                        Izin Mendirikan Bangunan
                      </option>
                      <option value="Izin Usaha">Izin Usaha</option>
                      <option value="Izin Lingkungan / Persetujuan Lingkungan">
                        Izin Lingkungan / Persetujuan Lingkungan
                      </option>
                      <option value="Izin Standar dan atau Rincian Teknis TPS Limbah B3">
                        Izin Standar dan atau Rincian Teknis TPS Limbah B3
                      </option>
                      <option value="Izin Pembuangan Air Limbah">
                        Izin Pembuangan Air Limbah
                      </option>
                      <option value="Izin Pengambilan Air Tanah">
                        Izin Pengambilan Air Tanah
                      </option>
                      <option value="Izin Pemanfaatan Air Permukaan">
                        Izin Pemanfaatan Air Permukaan
                      </option>
                      <option value="Izin Pengumpulan Limbah B3">
                        Izin Pengumpulan Limbah B3
                      </option>
                      <option value="Izin Pemanfaatan Limbah B3">
                        Izin Pemanfaatan Limbah B3
                      </option>
                      <option value="Izin Pengelolaan Limbah B3">
                        Izin Pengelolaan Limbah B3
                      </option>
                      <option value="TDP">TDP</option>
                      <option value="NIB">NIB (Nomor Induk Berusaha)</option>
                      <option value="Persetujuan Teknis IPAL">
                        Persetujuan Teknis IPAL
                      </option>
                      <option value="Rincian Teknis B3">
                        Rincian Teknis B3
                      </option>
                    </select>
                  </div>
                  <div class="mb-4" v-if="form.type">
                    <div class="form-group">
                      <label for="license_number">Nomor Izin</label>
                      <input
                        type="text"
                        v-model="form.license_number"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="issuing_agency"
                        >Instansi Yang Mengeluarkan</label
                      >
                      <input
                        type="text"
                        v-model="form.issuing_agency"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="permit_date">Tanggal Izin</label>
                          <input
                            type="date"
                            v-model="form.permit_date"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="permit_date_expired"
                            >Tanggal Izin Berakhir (Jika Ada)</label
                          >
                          <input
                            type="date"
                            v-model="form.permit_date_expired"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="form-group"
                      v-if="
                        form.type ===
                        'Izin Standar dan atau Rincian Teknis TPS Limbah B3'
                      "
                    >
                      <label for="building_land_area">Jenis Usaha</label>
                      <input
                        type="text"
                        v-model="form.type_of_business"
                        class="form-control"
                        required
                      />
                    </div>
                    <div
                      class="row sub-title"
                      v-if="
                        form.type ===
                        'Izin Standar dan atau Rincian Teknis TPS Limbah B3'
                      "
                    >
                      <h6>Data Penyimpanan</h6>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="building_land_area">Jenis</label>
                          <input
                            type="text"
                            v-model="form.storage_data_type"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="building_land_area">Volume</label>
                          <input
                            type="text"
                            v-model="form.storage_data_volume"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="building_land_area">Sumber</label>
                          <input
                            type="text"
                            v-model="form.storage_data_source"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div
                          class="form-group"
                          v-if="form.type === 'Izin Mendirikan Bangunan'"
                        >
                          <label for="building_land_area"
                            >Luas Bangunan Lahan (m)</label
                          >
                          <input
                            type="text"
                            v-model="form.building_land_area"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div
                          class="form-group"
                          v-if="form.type === 'Izin Mendirikan Bangunan'"
                        >
                          <label for="building_level_area"
                            >Luas Bangunan Tingkat (m)</label
                          >
                          <input
                            type="text"
                            v-model="form.building_floor_area"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="form-group"
                      v-if="form.type === 'Izin Mendirikan Bangunan'"
                    >
                      <label for="survey_letter">Surat Ukur</label>
                      <input
                        type="text"
                        v-model="form.survey_letter"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="form-group" v-if="form.type === 'Izin Usaha'">
                      <label for="main_traded_goods">Barang/Jasa Dagangan Utama</label>
                      <input
                        type="text"
                        v-model="form.main_traded_goods"
                        class="form-control"
                        required
                      />
                    </div>
                    <div
                      class="form-group"
                      v-if="form.type === 'Izin Pembuangan Air Limbah'"
                    >
                      <label for="wastewater_source">Sumber Air Limbah</label>
                      <input
                        type="text"
                        v-model="form.wastewater_source"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div
                          class="form-group"
                          v-if="form.type === 'Izin Pembuangan Air Limbah'"
                        >
                          <label for="longitude">Longitude</label>
                          <input
                            type="text"
                            v-model="form.longitude"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div
                          class="form-group"
                          v-if="form.type === 'Izin Pembuangan Air Limbah'"
                        >
                          <label for="latitude">Latitude</label>
                          <input
                            type="text"
                            v-model="form.latitude"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div
                          class="form-group"
                          v-if="form.type === 'Izin Pembuangan Air Limbah'"
                        >
                          <label for="treatment_capacity">Kapasitas IPAL</label>
                          <input
                            type="text"
                            v-model="form.treatment_capacity"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div
                          class="form-group"
                          v-if="form.type === 'Izin Pembuangan Air Limbah'"
                        >
                          <label for="treatment_capacity"
                            >Debit Limbah Yang Diizinkan</label
                          >
                          <input
                            type="text"
                            v-model="form.allowed_waste_debit"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div
                          class="form-group"
                          v-if="form.type === 'Izin Pembuangan Air Limbah'"
                        >
                          <label for="unit">Satuan</label>
                          <input
                            type="text"
                            v-model="form.unit"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group" v-if="form.type === 'TDP'">
                          <label for="unit">Kegiatan Usaha Pokok</label>
                          <input
                            type="text"
                            v-model="form.main_business_activity"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group" v-if="form.type === 'TDP'">
                          <label for="unit">Status</label>
                          <input
                            type="text"
                            v-model="form.status"
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="photo">Upload Foto Dokumen</label>
                      <input
                        type="file"
                        @change="uploadNIB"
                        class="form-control"
                      />
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="field-btns">
                          <button
                            class="btn btn-primary next_btn"
                            type="submit"
                          >
                            Simpan
                          </button>
                          <router-link
                            to="/Data/Perizinan"
                            class="btn btn-secondary m-2"
                            >Kembali</router-link
                          >
                        </div>
                      </div>
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
/* Style your form here */
</style>
