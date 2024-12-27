<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import MainWrapper from '@/components/MainWrapper.vue'
import { getIpalDetail, updateStatusIpal } from '@/lib/company.js'

const $loading = useLoading()
const route = useRoute()
const router = useRouter()

const formData = ref(null)
const isInletChecked = ref(false)
const isOutletChecked = ref(false)
const status = ref('')
const catatan = ref('')

const updateStatus = async () => {
  const loader = $loading.show()
  try {
    // Mengirim status dan catatan
    await updateStatusIpal(route.params.id, {
      status: status.value,
      catatan: catatan.value || '',
    })
    router.push('/Verifikator/PertekIPAL')
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const loadData = async () => {
  const loader = $loading.show()
  try {
    formData.value = await getIpalDetail(route.params.id)
    isInletChecked.value =
      formData.value.waste_discharge_measuring_instrument_inlet == 'Ada'
    isOutletChecked.value =
      formData.value.waste_discharge_measuring_instrument_outlet == 'Ada'
    status.value = formData.value.status
    catatan.value = formData.value.catatan || ''
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <MainWrapper>
    <div class="page-wrapper page-settings">
      <div class="content">
        <div v-if="formData" class="row">
          <div class="col-lg-10 mx-auto">
            <div class="content-page-header mb-2">
              <h3>Verifikasi Pertek IPAL</h3>
            </div>
            <div class="row">
              <div class="form-group">
                <label class="col-form-label">Status</label>
                <select v-model="status" class="form-control">
                  <option value="">Pilih Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="DITERIMA">DITERIMA</option>
                  <option value="DITOLAK">DITOLAK</option>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Catatan Perbaikan</label>
                <textarea class="form-control" v-model="catatan"></textarea>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Jenis IPAL</label>
                  <select class="form-control" v-model="formData.type" disabled>
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
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group d-flex flex-column align-items-start">
                  <label class="col-form-label">File Izin Perusahaan</label>
                  <a
                    :href="formData.file_izin_perusahaan"
                    target="_blank"
                    class="btn btn-secondary"
                    >Lihat File</a
                  >
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label">Acuan Baku Mutu</label>
                  <select
                    class="form-control"
                    v-model="formData.acuan_baku_mutu"
                    disabled
                  >
                    <option
                      value="Permen LHK No. 5 Tahun 2014 Tentang Baku Mutu Air Limbah"
                    >
                      Permen LHK No. 5 Tahun 2014 Tentang Baku Mutu Air Limbah
                    </option>
                    <option
                      value="Permen LHK No. 68 Tahun 2016 Tentang Baku Mutu Air Limbah Domestik"
                    >
                      Permen LHK No. 68 Tahun 2016 Tentang Baku Mutu Air Limbah
                      Domestik
                    </option>
                    <option
                      value="Permen LHK No. 16 Tahun 2019 Tentang Baku Mutu Air Limbah"
                    >
                      Permen LHK No. 16 Tahun 2019 Tentang Baku Mutu Air Limbah
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Longitude (Ex. -123.21312)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="-153.2123"
                    v-model="formData.longitude"
                    disabled
                  />
                  <a
                    href="https://www.yogantara.info/"
                    class="text-small"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Konvert dari derajat ke decimal Link</a
                  >
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Latitude (Ex. -123.21312)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.latitude"
                    disabled
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
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">Kapasitas IPAL</label>
                  <div class="form-duration">
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.capacity_ipal"
                      disabled
                    />
                    <span class="mins">m3</span>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Satuan Kapasitas</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.unit_in_capacity"
                  />
                </div>
              </div> -->
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
                        <select
                          class="form-control"
                          v-model="
                            formData.waste_discharge_measuring_instrument_inlet_name
                          "
                          disabled
                        >
                          <option value="" disabled>
                            Pilih Nama Alat Ukur Pembuangan Limbah Masuk
                          </option>
                          <option value="U Notch">U Notch</option>
                          <option value="V Notch">V Notch</option>
                          <option value="Flowmeter">Flowmeter</option>
                          r
                        </select>
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
                        <select
                          class="form-control"
                          v-model="
                            formData.waste_discharge_measuring_instrument_outlet_name
                          "
                          disabled
                        >
                          <option value="" disabled>
                            Pilih Nama Alat Ukur Pembuangan Limbah Masuk
                          </option>
                          <option value="U Notch">U Notch</option>
                          <option value="V Notch">V Notch</option>
                          <option value="Flowmeter">Flowmeter</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label"
                    >Debit Air Limbah Yang Diijinkan</label
                  >
                  <div class="form-duration">
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.permissible_waste_water_discharge"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Satuan Debit Air Limbah</label>
                  <select
                    class="form-control"
                    v-model="formData.unit_permissible_waste_water_discharge"
                    disabled
                  >
                    <option value="" disabled>Pilih Satuan</option>
                    <option value="M3/Hari">M3/Hari</option>
                    <option value="M3/Detik">M3/Detik</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Sumber Air Limbah</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.waste_water_source"
                    disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!formData.itemz.length">
                    <td colspan="2" class="text-center">
                      Data Tidak Ditemukan
                    </td>
                  </tr>
                  <tr v-for="(detail, index) in formData.itemz" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        v-model="detail.recycling_effort"
                        placeholder="Masukkan Upaya Pengelolaan"
                        style="word-wrap: break-word; overflow-wrap: break-word"
                        disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row mt-4">
              <div class="col-md-4">
                <div class="form-group d-flex flex-column align-items-start">
                  <label for="photo">Persetujuan Teknis IPAL</label>
                  <a
                    :href="formData.ipal_design_note"
                    target="_blank"
                    class="btn btn-secondary"
                    >Lihat File</a
                  >
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="!formData.items.length">
                      <td colspan="4" class="text-center">
                        Data Tidak Ditemukan
                      </td>
                    </tr>
                    <tr v-for="(detail, index) in formData.items" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          v-model="detail.chemicals_used"
                          placeholder="Masukkan Bahan Kimia"
                          disabled
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label"
                    >Badan Air yang Menerima Limbah Cair</label
                  >
                  <select
                    class="form-control"
                    v-model="formData.water_bodies_receiving_liquid_waste"
                    disabled
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
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="col-form-label">Satuan Jumlah Lumpur</label>
                  <select
                    class="form-control"
                    v-model="formData.unit_in_amount_of_mud_sludge"
                    disabled
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
                disabled
              >
                <option value="Diserahkan pada pihak ketiga">
                  Diserahkan pada pihak ketiga
                </option>
                <option value="Dilakukan pengolahan lumpur">
                  Dilakukan pengolahan lumpur
                </option>
              </select>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="field-btns d-flex justify-content-between">
                  <div>
                    <button
                      class="btn btn-primary next_btn"
                      @click="updateStatus"
                    >
                      Update
                    </button>
                    <router-link
                      to="/Verifikator/PertekIPAL"
                      class="btn btn-secondary m-2"
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
