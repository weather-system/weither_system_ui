<script setup>
import axios from 'axios'
import MainWrapper from '@/components/MainWrapper.vue'
import { ref, watch, computed, onMounted } from 'vue'
import { logout as authLogout } from '@/lib/auth.js'
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const $loading = useLoading()
const store = useStore()
const router = useRouter()

const logout = async () => {
  const loader = $loading.show()
  try {
    await authLogout()
    router.push('/Login')
  } catch (e) {
    alert('error logout')
    console.error(e)
  } finally {
    loader.hide()
  }
}
const searchQuery = ref('')
const kbliOptions = {
  ABC00909: 'test',
  ABC00910: 'example',
}

const filteredKbliOptions = computed(() => {
  if (!searchQuery.value) return kbliOptions
  return Object.entries(kbliOptions)
    .filter(([key]) =>
      key.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
})

const npwp = ref('')
const formatNpwp = () => {
  let cleaned = formData.value.npwp.replace(/\D/g, '').slice(0, 15)
  let formatted = ''

  for (let i = 0; i < cleaned.length; i++) {
    if (i === 2 || i === 5 || i === 8 || i === 9 || i === 12) {
      formatted += '.'
    }
    formatted += cleaned[i]
  }

  formData.value.npwp = formatted
}

const formData = ref({
  npwp: '',
  local_npwp: '',
  activity_type: '',
  production_capacity: '',
  employees_total: '',
  land_area: '',
  any_ipal: '',
  ipal_total: null,
  ipal_type: '',
  any_wells: '',
  wells_total: null,
  any_tpsb3: '',
  tpsb3_total: null,
  any_genset: '',
  genset_total: null,
  source: [],
  pic_name: '',
  shift_count: '',
  building_area: '',
  green_open_space_area: '',
})

const message = ref('')

const validateForm = () => {
  const requiredFields = [
    'npwp',
    'local_npwp',
    'activity_type',
    'production_capacity',
    'employees_total',
    'land_area',
    'any_ipal',
  ]

  for (const field of requiredFields) {
    if (!formData.value[field]) {
      return false
    }
  }
  return true
}

const submitForm = async () => {
  if (!validateForm()) {
    Swal.fire({
      title: 'Data Tidak Lengkap!',
      text: 'Silakan lengkapi semua kolom yang wajib diisi.',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
    return
  }

  const token = localStorage.getItem('TOKEN')
  if (!token) {
    Swal.fire({
      title: 'Token Tidak Tersedia!',
      text: 'Silakan login ulang.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    return
  }

  const loader = $loading.show()
  try {
    const selectedSources = formData.value.source.join(', ')
    const response = await axios.post(
      'http://localhost:8000/api/companies/details',
      {
        ...formData.value,
        source: selectedSources,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    Swal.fire({
      title: 'Registrasi Berhasil!',
      text: response.data.message || 'Data perusahaan telah berhasil disimpan.',
      icon: 'success',
      confirmButtonText: 'OK'
    })

    // Reset form data
    Object.assign(formData.value, {
      npwp: '',
      local_npwp: '',
      activity_type: '',
      production_capacity: '',
      employees_total: '',
      land_area: '',
      any_ipal: '',
      ipal_total: null,
      ipal_type: '',
      any_wells: '',
      wells_total: null,
      any_tpsb3: '',
      tpsb3_total: null,
      any_genset: '',
      genset_total: null,
      source: [],
      pic_name: '',
      shift_count: '',
      building_area: '',
      green_open_space_area: '',
    })
  } catch (error) {
    console.error(error)
    Swal.fire({
      title: 'Registrasi Gagal!',
      text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  } finally {
    loader.hide()
  }
}

const kodekbli = ref('')
const kodeJudul = ref('')
watch(kodekbli, newValue => {
  kodeJudul.value = kbliOptions[newValue] || ''
})
console.log(localStorage.getItem('token'))
const userStatus = ref(null)
const loading = ref(true)
const fetchUserStatus = async () => {
  const token = localStorage.getItem('TOKEN')
  if (!token) return

  try {
    const response = await axios.get('http://localhost:8000/api/user/status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    userStatus.value = response.data.status
  } catch (error) {
    console.error('Error fetching user status:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserStatus()
})
</script>

<template>
  <div v-if="userStatus === 'DITERIMA'">
    <MainWrapper>
      <div class="page-wrapper">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-lg-10 mx-auto">
                <h3 class="mb-5">Lengkapi seluruh persyaratan pendaftaran</h3>

                <!-- Service List -->
                <!-- <ul id="progressbar">
                <li class="active">
                  <div class="multi-step-info">
                    <h6>Service Information</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-clipboard"></i></span>
                  </div>
                </li>
                <li>
                  <div class="multi-step-info">
                    <h6>Booking</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-smartphone"></i></span>
                  </div>
                </li>
                <li>
                  <div class="multi-step-info">
                    <h6>Location</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-map-pin"></i></span>
                  </div>
                </li>
                <li>
                  <div class="multi-step-info">
                    <h6>Gallery</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-image"></i></span>
                  </div>
                </li>
              </ul> -->
                <!-- /Service List -->

                <div class="row">
                  <div class="col-lg-12 mx-auto">
                    <!-- Service Information -->
                    <form @submit.prevent="submitForm">
                      <fieldset id="first-field">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="sub-title">
                              <h6>Data Perusahaan</h6>
                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label class="col-form-label"
                                    >KODE KBLI</label
                                  >
                                  <div class="input-group mb-2">
                                    <span
                                      class="input-group-text"
                                      id="search-addon"
                                    >
                                      <i class="fas fa-search"></i>
                                    </span>
                                    <input
                                      type="text"
                                      class="form-control input-dark-placeholder"
                                      placeholder="Search KODE KBLI"
                                      v-model="searchQuery"
                                      aria-label="Search KODE KBLI"
                                      style="placecolor: black"
                                    />
                                  </div>
                                  <select
                                    class="form-control"
                                    v-model="kodekbli"
                                  >
                                    <option value="" disabled selected>
                                      Pilih KODE KBLI
                                    </option>

                                    <option
                                      v-for="(
                                        value, key
                                      ) in filteredKbliOptions"
                                      :key="key"
                                      :value="key"
                                    >
                                      {{ key }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label class="col-form-label">Judul</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :value="kodeJudul"
                                    readonly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label">NPWP</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukan Nomer NPWP Perusahaan"
                                v-model="formData.npwp"
                                @input="formatNpwp"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label">NPWP-D</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukan Nomer NPWP Daerah"
                                v-model="formData.local_npwp"
                              />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label class="col-form-label">Jenis Usaha</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan Jenis Usaha"
                                v-model="formData.activity_type"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Kapasitas Produksi
                              </label>
                              <div class="form-duration">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Masukkan Kapasitas Produksi"
                                  v-model="formData.production_capacity"
                                />
                                <span class="mins"
                                  >Satuan : $data jenis usaha</span
                                >
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Jumlah Karyawan</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan Jumlah Karyawan"
                                v-model="formData.employees_total"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label">Jumlah Shift</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukan Jumlah Shift"
                                v-model="formData.shift_count"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="sub-title">
                              <h6>Luas Perusahaan</h6>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div
                              class="status-toggle sml-status float-sm-end mb-3"
                            ></div>
                          </div>
                        </div>
                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">Luas Lahan</label>
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan Luas Lahan"
                                    v-model="formData.land_area"
                                    step="0.01"
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Luas Bangunan</label
                                >
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan Luas Bangunan"
                                    v-model="formData.building_area"
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Luas Ruang Terbuka Hijau</label
                                >
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan Luas Ruang Terbuka Hijau"
                                    v-model="formData.green_open_space_area"
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="sub-title">
                              <h6>Dokumen Perusahaan</h6>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div
                              class="status-toggle sml-status float-sm-end mb-3"
                            >
                              <input
                                type="checkbox"
                                id="status_1"
                                class="check"
                                checked=""
                              />
                            </div>
                          </div>
                        </div>
                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">IPAL</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_ipal"
                                >
                                  <option value="">Pilih Status IPAL</option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_ipal === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah IPAL</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah IPAL"
                                  v-model="formData.ipal_total"
                                />
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_ipal === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label">Jenis IPAL</label>
                                <select class="form-control" v-model="ipalType">
                                  <option value="">Pilih Jenis IPAL</option>
                                  <option value="Domestik">Domestik</option>
                                  <option value="Industri">Industri</option>
                                  <option value="Integrasi">Integrasi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">Cerobong</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_wells"
                                >
                                  <option value="" disabled selected>
                                    Pilih Status Cerobong
                                  </option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_wells === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah Cerobong</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah cerobong"
                                  v-model="formData.wells_total"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">TPSB3</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_tpsb3"
                                >
                                  <option value="" disabled selected>
                                    Pilih Status TPSB3
                                  </option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_tpsb3 === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah TPSB3</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah TPSB3"
                                  v-model="formData.tpsb3_total"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">Genset</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_genset"
                                >
                                  <option value="" disabled selected>
                                    Pilih Status Genset
                                  </option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_genset === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah Genset</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah Genset"
                                  v-model="formData.genset_total"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label class="col-form-label">Sumber</label>
                                <div class="d-flex flex-wrap">
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="dalam"
                                      v-model="formData.source"
                                    />
                                    Dalam
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="resapan"
                                      v-model="formData.source"
                                    />
                                    Resapan
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="imbuhan"
                                      v-model="formData.source"
                                    />
                                    Imbuhan
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="biopori"
                                      v-model="formData.source"
                                    />
                                    Biopori
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Penanggung Jawab Monitoring Lingkungan</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan Penanggung Jawab"
                                v-model="formData.pic_name"
                              />
                            </div>
                          </div>
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
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                    <div v-if="message">{{ message }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  </div>
  <div v-else>
    <MainWrapper>
      <div class="page-wrapper">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-lg-10 mx-auto">
                <h3 class="mb-5">Lengkapi seluruh persyaratan pendaftaran</h3>
                <!-- Service List -->
                <!-- <ul id="progressbar">
                <li class="active">
                  <div class="multi-step-info">
                    <h6>Service Information</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-clipboard"></i></span>
                  </div>
                </li>
                <li>
                  <div class="multi-step-info">
                    <h6>Booking</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-smartphone"></i></span>
                  </div>
                </li>
                <li>
                  <div class="multi-step-info">
                    <h6>Location</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-map-pin"></i></span>
                  </div>
                </li>
                <li>
                  <div class="multi-step-info">
                    <h6>Gallery</h6>
                    <p>Lorem ipsum dolor sit</p>
                  </div>
                  <div class="multi-step-icon">
                    <span><i class="feather-image"></i></span>
                  </div>
                </li>
              </ul> -->
                <!-- /Service List -->

                <div class="row">
                  <div class="col-lg-12 mx-auto">
                    <!-- Service Information -->
                    <form @submit.prevent="submitForm">
                      <fieldset id="first-field">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="sub-title">
                              <h6>Data Perusahaan</h6>
                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label class="col-form-label"
                                    >KODE KBLI</label
                                  >
                                  <div class="input-group mb-2">
                                    <span
                                      class="input-group-text"
                                      id="search-addon"
                                    >
                                      <i class="fas fa-search"></i>
                                    </span>
                                    <input
                                      type="text"
                                      class="form-control input-dark-placeholder"
                                      placeholder="Search KODE KBLI"
                                      v-model="searchQuery"
                                      aria-label="Search KODE KBLI"
                                      style="placecolor: black"
                                    />
                                  </div>
                                  <select
                                    class="form-control"
                                    v-model="kodekbli"
                                  >
                                    <option value="" disabled selected>
                                      Pilih KODE KBLI
                                    </option>

                                    <option
                                      v-for="(
                                        value, key
                                      ) in filteredKbliOptions"
                                      :key="key"
                                      :value="key"
                                    >
                                      {{ key }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label class="col-form-label">Judul</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :value="kodeJudul"
                                    readonly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label">NPWP</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukan Nomer NPWP Perusahaan"
                                v-model="formData.npwp"
                                @input="formatNpwp"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label">NPWP-D</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukan Nomer NPWP Daerah"
                                v-model="formData.local_npwp"
                              />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label class="col-form-label">Jenis Usaha</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan Jenis Usaha"
                                v-model="formData.activity_type"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Kapasitas Produksi
                              </label>
                              <div class="form-duration">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Masukkan Kapasitas Produksi"
                                  v-model="formData.production_capacity"
                                />
                                <span class="mins"
                                  >Satuan : $data jenis usaha</span
                                >
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Jumlah Karyawan</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan Jumlah Karyawan"
                                v-model="formData.employees_total"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label">Jumlah Shift</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukan Jumlah Shift"
                                v-model="formData.shift_count"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="sub-title">
                              <h6>Luas Perusahaan</h6>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div
                              class="status-toggle sml-status float-sm-end mb-3"
                            ></div>
                          </div>
                        </div>
                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">Luas Lahan</label>
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan Luas Lahan"
                                    v-model="formData.land_area"
                                    step="0.01"
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Luas Bangunan</label
                                >
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan Luas Bangunan"
                                    v-model="formData.building_area"
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Luas Ruang Terbuka Hijau</label
                                >
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan Luas Ruang Terbuka Hijau"
                                    v-model="formData.green_open_space_area"
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="sub-title">
                              <h6>Dokumen Perusahaan</h6>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div
                              class="status-toggle sml-status float-sm-end mb-3"
                            >
                              <input
                                type="checkbox"
                                id="status_1"
                                class="check"
                                checked=""
                              />
                            </div>
                          </div>
                        </div>
                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">IPAL</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_ipal"
                                >
                                  <option value="">Pilih Status IPAL</option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_ipal === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah IPAL</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah IPAL"
                                  v-model="formData.ipal_total"
                                />
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_ipal === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label">Jenis IPAL</label>
                                <select class="form-control" v-model="ipalType">
                                  <option value="">Pilih Jenis IPAL</option>
                                  <option value="Domestik">Domestik</option>
                                  <option value="Industri">Industri</option>
                                  <option value="Integrasi">Integrasi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">Cerobong</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_wells"
                                >
                                  <option value="" disabled selected>
                                    Pilih Status Cerobong
                                  </option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_wells === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah Cerobong</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah cerobong"
                                  v-model="formData.wells_total"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">TPSB3</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_tpsb3"
                                >
                                  <option value="" disabled selected>
                                    Pilih Status TPSB3
                                  </option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_tpsb3 === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah TPSB3</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah TPSB3"
                                  v-model="formData.tpsb3_total"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">Genset</label>
                                <select
                                  class="form-control"
                                  v-model="formData.any_genset"
                                >
                                  <option value="" disabled selected>
                                    Pilih Status Genset
                                  </option>
                                  <option value="Ada">Ada</option>
                                  <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                              </div>
                            </div>
                            <div
                              class="col-md-4"
                              v-if="formData.any_genset === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jumlah Genset</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Masukkan jumlah Genset"
                                  v-model="formData.genset_total"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label class="col-form-label">Sumber</label>
                                <div class="d-flex flex-wrap">
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="dalam"
                                      v-model="formData.source"
                                    />
                                    Dalam
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="resapan"
                                      v-model="formData.source"
                                    />
                                    Resapan
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="imbuhan"
                                      v-model="formData.source"
                                    />
                                    Imbuhan
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="biopori"
                                      v-model="formData.source"
                                    />
                                    Biopori
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Penanggung Jawab Monitoring Lingkungan</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan Penanggung Jawab"
                                v-model="formData.pic_name"
                              />
                            </div>
                          </div>
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
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                    <div v-if="message">{{ message }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
    <div class="overlay"></div>
    <div class="popup">
      <h2>Status Akun Anda</h2>
      <p class="info-text">Informasi: Status akun Anda saat ini adalah <strong>{{ userStatus }}</strong>.</p>
      <p>Mohon tunggu hingga akun Anda terverifikasi, atau hubungi nomor berikut:</p>
      <p class="contact-number">081-2345-6789</p>
      <div class="subscription-logout">
        <a @click="logout" href="#" class="logout-button">Log Out</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
  font-family: Arial, sans-serif;
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

.popup h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.info-text {
  font-size: 1em;
  color: #555;
  margin-bottom: 15px;
}

.contact-number {
  font-weight: bold;
  color: #007BFF;
  margin-top: 5px;
  margin-bottom: 15px;
}

.subscription-logout {
  margin-top: 20px;
}

.logout-button {
  color: #ffffff;
  background-color: #FF4D4D;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #FF3333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>