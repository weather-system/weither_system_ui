<script setup>
import axios from 'axios';
import MainWrapper from '@/components/MainWrapper.vue';
import { ref, watch, computed } from 'vue';

const searchQuery = ref('');
const kbliOptions = {
  ABC00909: 'test',
  ABC00910: 'example', // Add more mappings as needed
};

const filteredKbliOptions = computed(() => {
  if (!searchQuery.value) return kbliOptions; // Return all options if no search query
  return Object.entries(kbliOptions)
    .filter(([key]) => key.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
});

const npwp = ref('');
const formatNpwp = () => {
  let cleaned = npwp.value.replace(/\D/g, '').slice(0, 15);
  let formatted = '';

  for (let i = 0; i < cleaned.length; i++) {
    if (i === 2 || i === 5 || i === 8 || i === 9 || i === 12 || i === 15) {
      formatted += '.';
    }
    formatted += cleaned[i];
  }

  npwp.value = formatted;
};

const ipalStatus = ref('');
const ipalType = ref('');
const cerobongStatus = ref('');
const gensetStatus = ref('');
const sumberOptions = ref({
  dalam: false,
  resapan: false,
  imbuhan: false,
  biopori: false,
});

const formData = ref({
  npwp: '',
  local_npwp: '',
  activity_type: '',
  production_capacity: '',
  employees_total: '',
  land_area: '',
  any_ipal: '', // Ensure this is bound to an input
  ipal_total: null,
  ipal_type: '',
  any_wells: '',
  wells_total: null,
  any_tpsb3: '',
  tpsb3_total: null,
  any_genset: '',
  genset_total: null,
  source: '',
  pic_name: '',
  shift_count: '',
  building_area: '',
  green_open_space_area: '',
});

const message = ref('');

// Validation function
const validateForm = () => {
  const requiredFields = [
    'npwp',
    'local_npwp',
    'activity_type',
    'production_capacity',
    'employees_total',
    'land_area',
    'any_ipal', // Include required fields here
  ];

  for (const field of requiredFields) {
    if (!formData.value[field]) {
      return false; // If any required field is empty, return false
    }
  }
  return true; // All required fields are filled
};

const submitForm = async () => {
  if (!validateForm()) {
    message.value = 'Silakan lengkapi semua kolom yang wajib diisi.'; // Inform the user
    return;
  }

  try {
    const response = await axios.post('http://localhost:8000/api/companies/details', formData.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust your authentication token
      },
    });
    message.value = response.data.message;
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
      source: '',
      pic_name: '',
      shift_count: '',
      building_area: '',
      green_open_space_area: '',
    }); // Reset form after successful submission
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      message.value = error.response.data.message || 'Terjadi kesalahan saat menyimpan.';
    } else {
      message.value = 'Terjadi kesalahan saat menyimpan.';
    }
  }
};

const kodekbli = ref('');
const kodeJudul = ref('');
watch(kodekbli, (newValue) => {
  kodeJudul.value = kbliOptions[newValue] || ''; // Set the corresponding Nama
});
</script>


<template>
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
                                <label class="col-form-label">KODE KBLI</label>
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
                                <select class="form-control" v-model="kodekbli">
                                  <option value="" disabled selected>
                                    Pilih KODE KBLI
                                  </option>

                                  <option
                                    v-for="(value, key) in filteredKbliOptions"
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
                              <select class="form-control" v-model="formData.any_ipal">
                                <option value="">Pilih Status IPAL</option>
                                <option value="Ada">Ada</option>
                                <option value="Tidak Ada">Tidak Ada</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4" v-if="formData.any_ipal === 'Ada'">
                            <div class="form-group">
                              <label class="col-form-label">Jumlah IPAL</label>
                              <input
                                type="number"
                                class="form-control"
                                placeholder="Masukkan jumlah IPAL"
                                v-model="formData.ipal_total"
                              />
                            </div>
                          </div>
                          <div class="col-md-4" v-if="formData.any_ipal === 'Ada'">
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
                          <div class="col-md-4" v-if="formData.any_wells === 'Ada'">
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
                          <div class="col-md-4" v-if="formData.any_tpsb3 === 'Ada'">
                            <div class="form-group">
                              <label class="col-form-label">Jumlah TPSB3</label>
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
                          <div class="col-md-4" v-if="formData.any_genset === 'Ada'">
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
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Masukan Sumber"
                              v-model="formData.source"
                            />
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
</template>
