<script setup>
import MainWrapper from '@/components/MainWrapper.vue'
import { ref } from 'vue';
import { watch, computed } from 'vue';
const searchQuery = ref('');
const filteredKbliOptions = computed(() => {
  if (!searchQuery.value) return kbliOptions; // Return all options if no search query
  return Object.entries(kbliOptions).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
});
const ipalStatus = ref('');
const cerobongStatus = ref('');
const tpsb3Status = ref('');
const gensetStatus = ref('');
const sumberOptions = ref({
  dalam: false,
  resapan: false,
  imbuhan: false,
  biopori: false,
});
const kodekbli = ref('');
const kodeJudul = ref('');
const kbliOptions = {
  'ABC00909': 'test',
  'ABC00910': 'example', // Add more mappings as needed
};
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
                              
                              <!-- Search Input -->
                              <div class="input-group mb-2">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Search KODE KBLI"
                                  v-model="searchQuery"
                                  aria-label="Search KODE KBLI"
                                />
                                <!-- <div class="input-group-append">
                                  <span class="input-group-text" id="search-addon">
                                    <i class="fas fa-search"></i> 
                                  </span>
                                </div> -->
                              </div>

                              <!-- Dropdown Select -->
                              <select class="form-control" v-model="kodekbli">
                                <option value="" disabled selected>Tidak ada data berdasarkan pencarian</option>
                                <!-- <option value="" disabled selected v-show="filteredKbliOptions.length === 0">
                                  Tidak ada data berdasarkan pencarian
                                </option> -->
                                
                                <option v-for="(value, key) in filteredKbliOptions" :key="key" :value="key">
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
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Jenis Usaha</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Masukkan Jenis Usaha"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Kapasitas Produksi
                            </label
                          >
                          <div class="form-duration">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Masukkan Kapasitas Produksi"
                            />
                            <span class="mins">Satuan : $data jenis usaha</span>
                          </div>
                        </div>
                        </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="col-form-label">Jumlah Karyawan</label>
                          <input
                              type="text"
                              class="form-control"
                              placeholder="Masukkan Jumlah Karyawan"
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
                        <div class="status-toggle sml-status float-sm-end mb-3">
                          
                        </div>
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
                            />
                            <span class="mins">m2</span>
                          </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="col-form-label">Luas Bangunan</label>
                            <div class="form-duration">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Masukkan Luas Bangunan"
                            />
                            <span class="mins">m2</span>
                          </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="col-form-label">Luas Ruang Terbuka Hijau</label>
                            <div class="form-duration">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Masukkan Luas Ruang Terbuka Hijau"
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
                        <div class="status-toggle sml-status float-sm-end mb-3">
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
                            <select class="form-control" v-model="ipalStatus">
                              <option value="">Pilih Status IPAL</option>
                              <option value="Ada">Ada</option>
                              <option value="Tidak Ada">Tidak Ada</option>
                            </select>
                          </div>
                        </div>
                      <div class="col-md-4" v-if="ipalStatus === 'Ada'">
                        <div class="form-group">
                          <label class="col-form-label">Jumlah IPAL</label>
                          <input type="number" class="form-control" placeholder="Masukkan jumlah IPAL" />
                        </div>
                      </div>
                      <div class="col-md-4" v-if="ipalStatus === 'Ada'">
                        <div class="form-group">
                          <label class="col-form-label">Jenis IPAL</label>
                          <select class="form-control">
                            <option value="">Pilih Jenis IPAL</option> <!-- Placeholder option -->
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
                            <select class="form-control" v-model="cerobongStatus">
                              <option value="" disabled selected>Pilih Status Cerobong</option>
                              <option value="Ada">Ada</option>
                              <option value="Tidak Ada">Tidak Ada</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4" v-if="cerobongStatus === 'Ada'">
                          <div class="form-group">
                            <label class="col-form-label">Jumlah Cerobong</label>
                            <input type="number" class="form-control" placeholder="Masukkan jumlah cerobong" />
                          </div>
                        </div>
                      </div>
                      <div class="row service-cont">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="col-form-label">TPSB3</label>
                            <select class="form-control" v-model="tpsb3Status">
                              <option value="" disabled selected>Pilih Status TPSB3</option>
                              <option value="Ada">Ada</option>
                              <option value="Tidak Ada">Tidak Ada</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4" v-if="tpsb3Status === 'Ada'">
                          <div class="form-group">
                            <label class="col-form-label">Jumlah TPSB3</label>
                            <input type="number" class="form-control" placeholder="Masukkan jumlah TPSB3" />
                          </div>
                        </div>
                      </div>
                      <div class="row service-cont">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="col-form-label">Genset</label>
                            <select class="form-control" v-model="gensetStatus">
                              <option value="" disabled selected>Pilih Status Genset</option>
                              <option value="Ada">Ada</option>
                              <option value="Tidak Ada">Tidak Ada</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4" v-if="gensetStatus === 'Ada'">
                          <div class="form-group">
                            <label class="col-form-label">Jumlah Genset</label>
                            <input type="number" class="form-control" placeholder="Masukkan jumlah Genset" />
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
                                  id="sumberDalam"
                                  class="form-check-input"
                                  v-model="sumberOptions.dalam"
                                />
                                <label class="form-check-label" for="sumberDalam">Dalam</label>
                              </div>
                              <div class="form-check me-3">
                                <input
                                  type="checkbox"
                                  id="sumberResapan"
                                  class="form-check-input"
                                  v-model="sumberOptions.resapan"
                                />
                                <label class="form-check-label" for="sumberResapan">Resapan</label>
                              </div>
                              <div class="form-check me-3">
                                <input
                                  type="checkbox"
                                  id="sumberImbuhan"
                                  class="form-check-input"
                                  v-model="sumberOptions.imbuhan"
                                />
                                <label class="form-check-label" for="sumberImbuhan">Imbuhan</label>
                              </div>
                              <div class="form-check me-3">
                                <input
                                  type="checkbox"
                                  id="sumberBiopori"
                                  class="form-check-input"
                                  v-model="sumberOptions.biopori"
                                />
                                <label class="form-check-label" for="sumberBiopori">Biopori</label>
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
                            placeholder="Enter Services Category"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="field-btns">
                          <button
                            class="btn btn-primary next_btn"
                            type="button"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="sub-title">
                          <h6>Booking</h6>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="col-form-label d-block"
                            >Choose Timing Type</label
                          >
                          <label class="custom_radio d-inline-block me-3">
                            <input
                              type="radio"
                              name="time"
                              checked=""
                              id="time-slot"
                            />
                            <span class="checkmark"></span> Time Slot
                          </label>
                          <label class="custom_radio d-inline-block me-3">
                            <input type="radio" name="time" id="time-picker" />
                            <span class="checkmark"></span> Time Picker
                          </label>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <!-- Timeslot -->
                        <div class="timeslot-sec">
                          <!-- Schedule Nav -->
                          <label class="col-form-label"
                            >Configure Time Slots</label
                          >
                          <div class="schedule-nav">
                            <ul class="nav">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-bs-toggle="tab"
                                  href="#all_days"
                                  >All Days</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slot_monday"
                                  >Monday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slot_tuesday"
                                  >Tuesday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slot_wednesday"
                                  >Wednesday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slot_thursday"
                                  >Thursday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slot_friday"
                                  >Friday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slot_saturday"
                                  >Saturday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slot_sunday"
                                  >Sunday</a
                                >
                              </li>
                            </ul>
                          </div>
                          <!-- /Schedule Nav -->

                          <div class="tab-content pt-0">
                            <div class="tab-pane active" id="all_days">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slot_monday">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slot_tuesday">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slot_wednesday">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slot_thursday">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slot_friday">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slot_saturday">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slot_sunday">
                              <div class="hours-info">
                                <div class="row hours-cont">
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="form-group">
                                      <label class="col-form-label"
                                        >Slots</label
                                      >
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Slot"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hours"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                          </div>
                        </div>
                        <!-- Timeslot -->

                        <!-- Timepicker -->
                        <div class="timepicker-sec">
                          <!-- Schedule Nav -->
                          <div class="schedule-nav">
                            <ul class="nav">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-bs-toggle="tab"
                                  href="#all_day"
                                  >All Days</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slots_monday"
                                  >Monday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slots_tuesday"
                                  >Tuesday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slots_wednesday"
                                  >Wednesday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slots_thursday"
                                  >Thursday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slots_friday"
                                  >Friday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slots_saturday"
                                  >Saturday</a
                                >
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  data-bs-toggle="tab"
                                  href="#slots_sunday"
                                  >Sunday</a
                                >
                              </li>
                            </ul>
                          </div>
                          <!-- /Schedule Nav -->

                          <div class="tab-content pt-0">
                            <div class="tab-pane active" id="all_day">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slots_monday">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slots_tuesday">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slots_wednesday">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slots_thursday">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slots_friday">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slots_saturday">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                            <div class="tab-pane fade" id="slots_sunday">
                              <div class="hrs-info">
                                <div class="row hrs-cont">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">From</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <label class="col-form-label">To</label>
                                      <div class="form-icon">
                                        <input
                                          type="text"
                                          class="form-control timepicker"
                                          placeholder="Select Time"
                                        />
                                        <span class="cus-icon"
                                          ><i class="feather-clock"></i
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a href="#" class="add-text add-hrs"
                                ><i class="feather-plus-circle"></i> Add
                                Hours</a
                              >
                            </div>
                          </div>
                        </div>
                        <!-- /Timepicker -->
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="field-btns">
                          <button
                            class="btn btn-primary next_btn"
                            type="button"
                          >
                            Next <i class="feather-arrow-right-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <!-- /Booking -->

                  <!-- Location -->
                  <fieldset>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="sub-title">
                          <h6>Additional Service</h6>
                        </div>
                        <div class="form-group">
                          <label class="col-form-label">Location</label>
                          <div class="map-grid">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
                              allowfullscreen=""
                              aria-hidden="false"
                              tabindex="0"
                              class="contact-map"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="col-form-label">Address</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Your Address"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="col-form-label">Country</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Country"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="col-form-label">State</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Your State"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="col-form-label">City</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Your City"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label class="col-form-label">Pincode</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Your Pincode"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="col-form-label"
                            >Google Maps Place ID</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Maps Place ID"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="col-form-label">Latitude</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Latitude Number"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label class="col-form-label">Longitude</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Longitude Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="field-btns">
                          <button
                            class="btn btn-primary next_btn"
                            type="button"
                          >
                            Next <i class="feather-arrow-right-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <!-- /Location -->

                  <!-- Gallery -->
                  <fieldset>
                    <div class="sub-title">
                      <h6>Gallery</h6>
                    </div>
                    <div class="file-upload">
                      <img src="@/assets/img/icons/upload.svg" alt="" />
                      <h6>Drag & drop files or <span>Browse</span></h6>
                      <p>Supported formates: JPEG, PNG, GIF, MP4</p>
                      <input type="file" accept="video/image" />
                    </div>
                    <div class="file-preview">
                      <ul>
                        <li>
                          <h6>Select Default Image:</h6>
                        </li>
                        <li>
                          <label class="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              class="rememberme"
                              checked
                            />
                            <span class="checkmark"></span>
                          </label>
                          <div class="img-preview">
                            <img
                              src="@/assets/img/services/service-01.jpg"
                              alt=""
                            />
                            <a href="#"><i class="feather-x-circle"></i></a>
                          </div>
                        </li>
                        <li>
                          <label class="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              class="rememberme"
                            />
                            <span class="checkmark"></span>
                          </label>
                          <div class="img-preview">
                            <img
                              src="@/assets/img/services/service-02.jpg"
                              alt=""
                            />
                            <a href="#"><i class="feather-x-circle"></i></a>
                          </div>
                        </li>
                        <li>
                          <label class="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              class="rememberme"
                            />
                            <span class="checkmark"></span>
                          </label>
                          <div class="img-preview">
                            <img
                              src="@/assets/img/services/service-03.jpg"
                              alt=""
                            />
                            <a href="#"><i class="feather-x-circle"></i></a>
                          </div>
                        </li>
                        <li>
                          <label class="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              class="rememberme"
                            />
                            <span class="checkmark"></span>
                          </label>
                          <div class="img-preview">
                            <img
                              src="@/assets/img/services/service-04.jpg"
                              alt=""
                            />
                            <a href="#"><i class="feather-x-circle"></i></a>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">Embed Video URL</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Ex: https//youtube.com"
                      />
                    </div>
                    <div class="field-btns">
                      <a
                        href="provider-services.html"
                        class="btn btn-primary next_btn"
                        >Done</a
                      >
                    </div>
                  </fieldset>
                  <!-- /Gallery -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>
