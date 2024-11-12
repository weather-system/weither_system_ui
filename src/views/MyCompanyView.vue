<script setup>
import axios from 'axios'
import MainWrapper from '@/components/MainWrapper.vue'
import KBLIModal from '@/components/KBLIModal.vue'
import { ref, watch, computed, onMounted } from 'vue'
import { logout as authLogout } from '@/lib/auth.js'
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { useRouter } from 'vue-router'
import { promptModal } from 'jenesius-vue-modal'
import Swal from 'sweetalert2'
const $loading = useLoading()
const store = useStore()
const router = useRouter()

const kbli = ref([])
const jenisUsaha = ref([])

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

const formData = ref({
  npwp: '',
  local_npwp: '',
  activity_type: '',
  production_capacity: '',
  unit_production: '',
  employees_total: '',
  land_area: '',
  kdb: '',
  kdh: '',
  any_ipal: '',
  ipal_total: null,
  ipalTypes: [],
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
    'unit_production',
    'employees_total',
    'land_area',
    'any_ipal',
  ]

  for (const field of requiredFields) {
    if (!formData[field]) {
      return false
    }
  }
  return true
}

const submitForm = async () => {
  if (!$loading.isActive) {
    const loader = $loading.show()
  try {
    const token = localStorage.getItem('TOKEN')
    if (!token) {
      Swal.fire('Error', 'Silakan login ulang.', 'error')
      return
    }

    // Pastikan semua field wajib terisi
    const requiredFields = [
      'npwp',
      'local_npwp',
      // 'activity_type',
      'any_genset',
      'any_tpsb3',
      'any_wells',
      'building_area',
      'kdb',
      'kdh',
      'employees_total',
      'green_open_space_area',
      'land_area',
      'pic_name',
      'production_capacity',
      'unit_production',
      'shift_count',
      'source',
    ]

    for (const field of requiredFields) {
      if (!formData.value[field]) {
        Swal.fire(
          'Error',
          `${field.replace(/_/g, ' ')} tidak boleh kosong.`,
          'error',
        )
        return
      }
    }

    const sumberAir = formData.value.source.filter((v) => {
      return v != 'PDAM Lainnya' && v != 'Lainnya'
    })

    if (formData.value.source.includes('PDAM Lainnya')) {
      sumberAir.push(formData.value.pdam_lainnya)
    }

    if (formData.value.source.includes('Lainnya')) {
      sumberAir.push(formData.value.lainnya_detail)
    }

    const data = {
      ...formData.value,
      npwp: formData.value.npwp,
      local_npwp: formData.value.local_npwp,
      // activity_type: formData.value.activity_type,
      any_genset: formData.value.any_genset,
      any_tpsb3: formData.value.any_tpsb3,
      any_wells: formData.value.any_wells,
      building_area: formData.value.building_area,
      kdb: formData.value.kdb.toString(),
      kdh: formData.value.kdh.toString(),
      employees_total: formData.value.employees_total,
      green_open_space_area: formData.value.green_open_space_area,
      land_area: formData.value.land_area,
      pic_name: formData.value.pic_name,
      production_capacity: formData.value.production_capacity,
      unit_production: formData.value.unit_production,
      shift_count: formData.value.shift_count,
      source: formData.value.source.toString(),
      any_ipal: formData.value.any_ipal,
      ipal_total: formData.value.ipal_total,
      kbli: kbli.value,
      jenisUsaha: jenisUsaha.value,
      sumberAir: sumberAir
    }

    const response = await axios.post(
      'http://localhost:8000/api/companies/details',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const companyId = response.data.data.id
    const ipalPromises = formData.value.ipalTypes.map(async type => {
      if (type) {
        return axios.post(
          'http://localhost:8000/api/company_ipals',
          {
            company_detail_id: companyId, // Ensure you are using the correct ID here
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      }
    })
    if (ipalPromises.length > 0) {
      await Promise.all(ipalPromises) // Tunggu hingga semua IPAL disimpan
    }

    Swal.fire('Success', 'Data berhasil disimpan.', 'success')
  } catch (error) {
    Swal.fire(
      'Error',
      error.response.data.message || 'Gagal menyimpan data.',
      'error',
    )
    console.error(error)
  }finally {
        loader.hide() // Hide loader after operation
      }
    }
}

const kodekbli = ref('')
const kodeJudul = ref('')
watch(kodekbli, newValue => {
  kodeJudul.value = kbliOptions[newValue] || ''
})

const userStatus = ref(null)
const companyDetail = ref(false)
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
    companyDetail.value = response.data.detail
  } catch (error) {
    console.error('Error fetching user status:', error)
  } finally {
    loading.value = false
  }
}

const openKbliModal = async () => {
  const selectedKbli = await promptModal(KBLIModal)
  kbli.value.push(selectedKbli)
}

const deleteKbli = data => {
  kbli.value = kbli.value.filter(v => {
    return v.kode != data.kode
  })
}

const addJenisUsaha = event => {
  jenisUsaha.value.push(event.target.value)
  event.target.value = ''
}

const deleteJenisUsaha = data => {
  jenisUsaha.value = jenisUsaha.value.filter(v => {
    return v != data
  })
}

onMounted(() => {
  fetchUserStatus()
})
const updateIpalTypes = () => {
  formData.value.ipalTypes = Array.from(
    { length: formData.value.ipal_total },
    () => '',
  )
}
const calculateBuildingAreaAndGreenSpace = () => {
  const landArea = parseFloat(formData.value.land_area) || 0
  const kdb = parseFloat(formData.value.kdb) || 0
  const kdh = parseFloat(formData.value.kdh) || 0

  formData.value.building_area = ((landArea * kdb) / 100).toFixed(2)
  formData.value.green_open_space_area = ((landArea * kdh) / 100).toFixed(2)
}

watch(
  () => [formData.value.land_area, formData.value.kdb, formData.value.kdh],
  () => calculateBuildingAreaAndGreenSpace(),
)

watch(
  () => formData.value.ipal_total,
  () => updateIpalTypes(),
)
</script>

<template>
  <div v-if="userStatus === 'DITERIMA' && !companyDetail">
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
                              <div class="col">
                                <div class="form-group">
                                  <label class="col-form-label m-0">KBLI</label>
                                  <div v-if="kbli.length < 1">
                                    <p class="mb-1">Tidak ada KBLI</p>
                                  </div>
                                  <div>
                                    <div
                                      v-for="data in kbli"
                                      :key="data.kode"
                                      class="card mb-3"
                                    >
                                      <div class="card-header p-2">
                                        {{ data.kode }} - {{ data.judul }}
                                      </div>
                                      <div class="card-body p-2">
                                        <p class="card-text">
                                          {{ data.uraian }}
                                        </p>
                                        <div
                                          class="d-flex justify-content-end mt-1"
                                        >
                                          <button
                                            @click="deleteKbli(data)"
                                            type="button"
                                            class="btn btn-danger"
                                          >
                                            Hapus
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <button
                                      @click="openKbliModal"
                                      type="button"
                                      class="btn btn-primary"
                                    >
                                      Tambah KBLI
                                    </button>
                                  </div>
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
                              <select
                                class="form-control"
                                @change="addJenisUsaha"
                              >
                                <option value="">Pilih</option>
                                <option
                                  value="Peternakaan sapi dan babi - (Satuan Produksi : Ekor/Bulan)"
                                >
                                  Peternakaan sapi dan babi - (Satuan Produksi :
                                  Ekor/Bulan)
                                </option>
                                <option
                                  value="Perhotelan - (Satuan Produksi : Orang/Bulan)"
                                >
                                  Perhotelan - (Satuan Produksi : Orang/Bulan)
                                </option>
                                <option
                                  value="Pemotongan Hewan - (Satuan Produksi : Ekor/Bulan)"
                                >
                                  Pemotongan Hewan - (Satuan Produksi :
                                  Ekor/Bulan)
                                </option>
                                <option
                                  value="Industri Tekstil (Q<=100 m3/hari) - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Tekstil (Q<=100 m3/hari) - (Satuan
                                  Produksi : Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Tekstil (Q=100-1000 m3/hari) - (Satuan Produksi : Ton/bulan)"
                                >
                                  Industri Tekstil (Q=100-1000 m3/hari) -
                                  (Satuan Produksi : Ton/bulan)
                                </option>
                                <option
                                  value="Industri Tekstil (Q>=1000m3/hari) - (Satuan Produksi : Ton/bulan)"
                                >
                                  Industri Tekstil (Q>=1000m3/hari) - (Satuan
                                  Produksi : Ton/bulan)
                                </option>
                                <option
                                  value="Industri Tekstil - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Tekstil - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Pelapisan Logam dan Galvanis - (Satuan Produksi : m2/Bulan)"
                                >
                                  Industri Pelapisan Logam dan Galvanis -
                                  (Satuan Produksi : m2/Bulan)
                                </option>
                                <option
                                  value="Industri Kayu lapis - (Satuan Produksi : m3/bulan)"
                                >
                                  Industri Kayu lapis - (Satuan Produksi :
                                  m3/bulan)
                                </option>
                                <option
                                  value="Industri Cat - (Satuan Produksi : Liter Cat Water Base/Bulan)"
                                >
                                  Industri Cat - (Satuan Produksi : Liter Cat
                                  Water Base/Bulan)
                                </option>
                                <option
                                  value="Fasilitas Pelayanan Kesehatan - (Satuan Produksi : Orang/Bulan)"
                                >
                                  Fasilitas Pelayanan Kesehatan - (Satuan
                                  Produksi : Orang/Bulan)
                                </option>
                                <option
                                  value="Industri Domestik - (Satuan Produksi : Orang/Bulan)"
                                >
                                  Industri Domestik - (Satuan Produksi :
                                  Orang/Bulan)
                                </option>
                                <option
                                  value="Pengolahan kedelai - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Pengolahan kedelai - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Pengolahan Daging - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Pengolahan Daging - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Pengolahan susu - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Pengolahan susu - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Yang belum Memiliki Baku mutu Air Limbah yang ditetapkan - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Yang belum Memiliki Baku mutu Air
                                  Limbah yang ditetapkan - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Minuman Ringan - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Minuman Ringan - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Tapioka - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Tapioka - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Soda Kostik - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Soda Kostik - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Sabun, deterjen produk minyak nabati - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Sabun, deterjen produk minyak nabati
                                  - (Satuan Produksi : Ton/Bulan)
                                </option>
                                <option
                                  value="Industri PET - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri PET - (Satuan Produksi : Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Penyamaan Kulit - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Penyamaan Kulit - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri MSG IMP - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri MSG IMP - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Baterai Timbal Asam (AKI) - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Baterai Timbal Asam (AKI) - (Satuan
                                  Produksi : Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Karet - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Karet - (Satuan Produksi : Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Farmasi - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Farmasi - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Elektronika - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Elektronika - (Satuan Produksi :
                                  Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Asam Tereftalat PTA - (Satuan Produksi : Ton/Bulan)"
                                >
                                  Industri Asam Tereftalat PTA - (Satuan
                                  Produksi : Ton/Bulan)
                                </option>
                                <option
                                  value="Industri Garment - (Satuan Produksi : ton/bulan)"
                                >
                                  Industri Garment - (Satuan Produksi :
                                  ton/bulan)
                                </option>
                                <option
                                  value="Industri Lainnya - (Satuan Produksi : ton/bulan)"
                                >
                                  Industri Lainnya - (Satuan Produksi :
                                  ton/bulan)
                                </option>
                              </select>
                              <div v-if="jenisUsaha.length < 1" class="mt-2">
                                <p>Tidak ada Jenis Usaha</p>
                              </div>
                              <div>
                                <div
                                  v-for="data in jenisUsaha"
                                  :key="data"
                                  class="card mt-2 mb-0"
                                >
                                  <div
                                    class="card-header p-2 d-flex justify-content-between align-items-center"
                                  >
                                    <p>{{ data }}</p>
                                    <button
                                      @click="deleteJenisUsaha(data)"
                                      type="button"
                                      class="btn btn-danger"
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </div>
                              </div>
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
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Satuan Produksi
                              </label>
                              <div class="form-duration">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Masukkan Satuan Produksi"
                                  v-model="formData.unit_production"
                                />
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
                          <div class="col-sm-6"></div>
                          <div class="col-sm-6">
                            <div
                              class="status-toggle sml-status float-sm-end mb-3"
                            ></div>
                          </div>
                        </div>
                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-8">
                              <div class="form-group">
                                <label class="col-form-label">Luas Lahan</label>
                                <div class="form-duration">
                                  <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Masukkan Luas Lahan"
                                    v-model="formData.land_area"
                                    step="0.01"
                                    @input="calculateBuildingAreaAndGreenSpace"
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">KDB</label>
                                <div class="form-duration">
                                  <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Masukkan KDB"
                                    v-model="formData.kdb"
                                    step="0.01"
                                    @input="calculateBuildingAreaAndGreenSpace"
                                  />
                                  <span class="mins">%</span>
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
                                    readonly
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">KDH</label>
                                <div class="form-duration">
                                  <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Masukkan KDH"
                                    v-model="formData.kdh"
                                    @input="calculateBuildingAreaAndGreenSpace"
                                  />
                                  <span class="mins">%</span>
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
                                    readonly
                                  />
                                  <span class="mins">m2</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6"></div>
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
                            <!-- IPAL Status Selection -->
                            <div class="col-md-6">
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

                            <!-- IPAL Count Input -->
                            <div
                              class="col-md-6"
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
                                  @input="updateIpalTypes"
                                />
                              </div>
                            </div>

                            <!-- IPAL Type Inputs -->
                            <div
                              class="col-md-4"
                              v-for="(ipal, index) in formData.ipalTypes"
                              :key="index"
                              v-if="formData.any_ipal === 'Ada'"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Jenis IPAL {{ index + 1 }}</label
                                >
                                <select
                                  class="form-control"
                                  v-model="formData.ipalTypes[index]"
                                >
                                  <option value="" disabled selected>
                                    Pilih Jenis IPAL
                                  </option>
                                  <option value="Domestik">Domestik</option>
                                  <option value="Industri">Industri</option>
                                  <option value="Integrasi">Integrasi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="row service-cont">
                            <div class="col-md-6">
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
                              class="col-md-6"
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
                            <div class="col-md-6">
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
                              class="col-md-6"
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
                            <div class="col-md-6">
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
                              class="col-md-6"
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
                                <label class="col-form-label">Sumber Air</label>
                                <div class="d-flex flex-wrap">
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="Air Tanah Dalam"
                                      v-model="formData.source"
                                    />
                                    Air Tanah Dalam
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="Air Permukaan"
                                      v-model="formData.source"
                                    />
                                    Air Permukaan
                                  </div>
                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="PDAM Lainnya"
                                      v-model="formData.source"
                                    />
                                    PDAM Lainnya
                                  </div>

                                  <div class="form-check me-3">
                                    <input
                                      type="checkbox"
                                      value="Lainnya"
                                      v-model="formData.source"
                                    />
                                    Lainnya
                                  </div>
                                </div>

                                  <!-- Input Tambahan jika Checkbox Terpilih -->

                                <div class="row mt-3">
                                    <div class="col-md-6" v-if="formData.source.includes('PDAM Lainnya')">
                                      <div class="form-group">
                                        <label class="col-form-label">Masukkan Nama PDAM</label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Masukkan nama PDAM lainnya"
                                          v-model="formData.pdam_lainnya"
                                        />
                                      </div>
                                    </div>

                                    <div class="col-md-6" v-if="formData.source.includes('Lainnya')">
                                      <div class="form-group">
                                        <label class="col-form-label">Masukkan Detail Lainnya</label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Masukkan detail lainnya"
                                          v-model="formData.lainnya_detail"
                                        />
                                      </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                          <!-- Input Tambahan jika Checkbox Terpilih -->
                          <div class="row mt-3">
                            <div
                              class="col-md-6"
                              v-if="formData.source.includes('PDAM LAINNYA')"
                            >
                              <div class="form-group">
                                <label class="col-form-label"
                                  >Masukkan Nama PDAM</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Masukkan nama PDAM lainnya"
                                  v-model="formData.pdam_lainnya"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-md-6"
                            v-if="formData.source.includes('lainnya')"
                          >
                            <div class="form-group">
                              <label class="col-form-label"
                                >Masukkan Detail Lainnya</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan detail lainnya"
                                v-model="formData.lainnya_detail"
                              />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Penanggung Jawab Monitoring Lingkungan (Nama :
                                Jabatan)
                                <p>Contoh (Jhon Doe - Direktur)</p></label
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
  <div v-else-if="userStatus != 'DITERIMA' && !companyDetail">
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
                          <div class="col-md-4">
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
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label class="col-form-label"
                                >Satuan Produksi
                              </label>
                              <div class="form-duration">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Masukkan Satuan Produksi"
                                  v-model="formData.unit_production"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
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
                            <!-- <div class="sub-title">
                              <h6>Luas Perusahaan</h6>
                            </div> -->
                          </div>
                          <div class="col-sm-6">
                            <div
                              class="status-toggle sml-status float-sm-end mb-3"
                            ></div>
                          </div>
                        </div>
                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-8">
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
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6"></div>
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
                                <label class="col-form-label">KDB</label>
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan KDB"
                                    v-model="formData.land_area"
                                    step="0.01"
                                  />
                                  <span class="mins">%</span>
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
                          </div>
                        </div>
                        <div class="addservice-info">
                          <div class="row service-cont">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="col-form-label">KDH</label>
                                <div class="form-duration">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Masukkan KDH"
                                    v-model="formData.green_open_space_area"
                                  />
                                  <span class="mins">%</span>
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
                          <div class="col-sm-6"></div>
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
                            <div class="col-md-6">
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
                              class="col-md-6"
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
                            <div class="col-md-6">
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
                            <div class="col-md-6">
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
                              class="col-md-6"
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
      <p class="info-text">
        Informasi: Status akun Anda saat ini adalah
        <strong>{{ userStatus }}</strong
        >.
      </p>
      <p>
        Mohon tunggu hingga akun Anda terverifikasi, atau hubungi nomor berikut:
      </p>
      <p class="contact-number">081-2345-6789</p>
      <div class="subscription-logout">
        <a @click="logout" href="#" class="logout-button">Log Out</a>
      </div>
    </div>
  </div>
  <div v-else>
    <MainWrapper>
      <div class="page-wrapper">
        <div class="content">
          <div class="container">
            <div class="row">
              <h1>Selamat datang</h1>
              <p>
                Silahkan lanjutkan mengisi data Perizinan, IPAL, Cerobong, TPS
                B3, dan Sumber Air
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        source: [],
        pdam_lainnya: '',
        lainnya_detail: '',
      },
    }
  },
}
</script>

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
  color: #007bff;
  margin-top: 5px;
  margin-bottom: 15px;
}

.subscription-logout {
  margin-top: 20px;
}

.logout-button {
  color: #ffffff;
  background-color: #ff4d4d;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff3333;
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
