<script setup>
import { ref, onMounted } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import * as yup from 'yup'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'
import Swal from 'sweetalert2'
import axios from 'axios'
import { watch } from 'vue'


const $loading = useLoading()
const form = ref(null)
const inletChecked = ref(false)
const outletChecked = ref(false)
const selectedIPALSystems = ref([])
const referensiBakuMutu = ref([]);
console.log("dataaa",selectedIPALSystems )
const getCombinedIPALSystems = () => selectedIPALSystems.value.join(', ')
console.log("testttt",getCombinedIPALSystems.value)

const initialValues = {
  recycle_efforts: null,
  unit_in_capacity: 'm3',
  ipal_sludge_storage_site: null,
  unit_permissible_waste_water_discharge: null,
  items: [],
  itemz: [],
}

const deleteipalitem = async id => {
  const { isConfirmed } = await Swal.fire({
    title: 'Apa kamu yakin ?',
    text: 'Kamu tidak akan bisa mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
    },
    buttonsStyling: false,
  })

  if (isConfirmed) {
    const loader = $loading.show()
    try {
      await axios.delete(`api/ipaldetail/${id}`)
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting IPAL:', error)
      Swal.fire('Error!', 'There was an error deleting the IPAL.', 'error')
    } finally {
      loader.hide()
    }
  }
}

const deleteupayapengelolaan = async id => {
  const { isConfirmed } = await Swal.fire({
    title: 'Apa kamu yakin ?',
    text: 'Kamu tidak akan bisa mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary',
    },
    buttonsStyling: false,
  })

  if (isConfirmed) {
    const loader = $loading.show()
    try {
      await axios.delete(`api/upayapengelolaan/${id}`)
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting:', error)
      Swal.fire('Error!', 'There was an error deleting the IPAL.', 'error')
    } finally {
      loader.hide()
    }
  }
}

const schema = yup.object({
  type: yup.string().required(),
  no_izin_perusahaan: yup.string().required(),
  longitude: yup.string().required(),
  latitude: yup.string().required(),
  year_of_manufacture_of_ipal: yup.string().required(),
  capacity_ipal: yup.string().required(),
  waste_discharge_measuring_instrument_inlet: yup.string().nullable(),
  waste_discharge_measuring_instrument_inlet_name: yup.string().nullable(),
  waste_discharge_measuring_instrument_outlet: yup.string().nullable(),
  waste_discharge_measuring_instrument_outlet_name: yup.string().nullable(),
  permissible_waste_water_discharge: yup.string().required(),
  waste_water_source: yup.string().required(),
//   system_ipal: yup.string().required(),
  water_bodies_receiving_liquid_waste: yup.string().required(),
  amount_of_mud_sludge: yup.number().required(),
  unit_in_amount_of_mud_sludge: yup.string().required(),
  further_sludge_handling: yup.string().required(),
  referensi_baku_mutu_id: yup.string().required(),
  catatan: yup.string().nullable(),
  status: yup.string().required(),
  items: yup.array(
    yup.object({
      chemicals_used: yup.string().required(),
      use_of_chemicals: yup.string().required(),
      unit_in_use_of_chemicals: yup.string().required(),
    }),
  ),
  itemz: yup.array(
    yup.object({
      recycling_effort: yup.string().required(),
    }),
  ),
})

const uploadDoc = async (e, callback) => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    callback(url)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const uploadPertekIpal = async (e, callback) => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(e.target.files[0])
    callback(url)
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const setValues = data => {
  form.value.setValues(data)
}

defineExpose({ setValues })

watch(selectedIPALSystems,(latest,_) => {
    form.value.setFieldValue('system_ipal',latest.join(', '))
  
})
onMounted(async () => {
  try {
    const response = await axios.get('/api/referensiBakuMutu?jenis_baku_mutu=IPAL');
    referensiBakuMutu.value = response.data
  } catch (error) {
    Swal.fire('Error!', 'Gagal memuat data Sumber Limbah.', 'error')
  } finally {
    loader.hide()
  }
});
</script>

<template>
  <Form
    ref="form"
    :validation-schema="schema"
    :initial-values="initialValues"
    @invalid-submit="console.log"
  >
    <div class="row">
      <div class="col-12 mt-2">
        <div class="row mb-3">
          <div class="row">
            <div class="form-group">
              <label class="col-form-label">Status</label>
              <Field
                name="status"
                as="select"
                class="form-control"
                :disabled="true"
                v-model="status"
              >
                <option value="">Pilih Status</option>
                <option value="PENDING">PENDING</option>
                <option value="DITERIMA">DITERIMA</option>
                <option value="DITOLAK">DITOLAK</option>
              </Field>
              <ErrorMessage name="status" class="text-danger" />
            </div>
            <div v-if="status === 'DITOLAK'">
              <div class="form-group">
                <label class="col-form-label">Catatan Perbaikan</label>
                <Field
                  name="catatan"
                  as="textarea"
                  class="form-control"
                  :class="status === 'DITOLAK' ? 'bg-warning' : ''"
                  :disabled="true" 
                />
                <ErrorMessage name="catatan" class="text-danger" />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <label class="col-form-label">Jenis IPAL</label>
              <Field
                name="type"
                as="select"
                class="form-control"
              >
                <option value="">Pilih Jenis IPAL</option>
                <option value="Domestik">Domestik</option>
                <option value="Industri">Industri</option>
                <option value="Integrasi">Integrasi</option>
              </Field>
              <ErrorMessage name="type" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-form-label">File Izin Perusahaan</label>
                <Field
                  name="file_izin_perusahaan"
                  v-slot="{ field, handleChange }"
                >
                  <input
                    @change="uploadDoc ($event, handleChange)"
                    type="file"
                    class="form-control mb-2"
                  />
                  <img
                    :src="field.value"
                    style="
                      max-width: 500px;
                      max-height: auto;
                      object-fit: contain;
                    "
                  /> </Field
                ><small class="form-text text-muted"
                  ><br>
                  Maksimal ukuran file: 20MB</small
                >

                <ErrorMessage name="file_izin_perusahaan" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-form-label">No. Izin Perusahaan</label>
                <Field name="no_izin_perusahaan" class="form-control" placeholder="Masukkan No. Izin Perusahaan"/>
                <ErrorMessage name="no_izin_perusahaan" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label class="col-form-label">Acuan Buku Mutu</label>
                <Field as="select" name="referensi_baku_mutu_id" class="form-control">
                  <option value="" disabled>Acuan Buku Mutu</option>
                  <option
                    v-for="referensi_baku_mutus in referensiBakuMutu"
                    :key="referensi_baku_mutus.id"
                    :value="referensi_baku_mutus.id"
                  >
                    Type : {{ referensi_baku_mutus.jenis }}, {{ referensi_baku_mutus.referensi }}
                  </option>
                </Field>
                <ErrorMessage name="referensi_baku_mutu_id" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Longitude TPS LB3 (Ex. -123.21312)</label
                  >
                  <Field name="longitude" class="form-control" placeholder="Masukkan Longitude"/>
                  <a
                    href="https://www.yogantara.info/"
                    class="text-small"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Konvert dari derajat ke decimal Link</a
                  ><br>
                  <ErrorMessage name="longitude" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Latitude TPS LB3 (Ex. -123.21312)</label
                  >
                  <Field name="latitude" class="form-control" placeholder="Masukkan Latitude"/>
                  <ErrorMessage name="latitude" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-form-label">Tahun Pembuatan IPAL</label>
                <Field
                  name="year_of_manufacture_of_ipal"
                  class="form-control"
                  placeholder="Masukkan Tahun Pembuatan IPAl"
                />
                <ErrorMessage name="year_of_manufacture_of_ipal" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-form-label">Kapasitas IPAL</label>
                <div class="form-duration">
                  <Field name="capacity_ipal" class="form-control" placeholder="Masukkan Kapasitas IPAl" />
                  <span class="mins">m3</span>
                </div>
                <ErrorMessage name="capacity_ipal" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group">
                <label class="col-form-label">Alat Ukur Debit Limbah</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 d-flex align-items-center">
              <div class="form-group col-md-1">
                  <div class="form-check me-3">
                    <Field
                      name="waste_discharge_measuring_instrument_inlet"
                      value="Ada"
                      unchecked-value="Tidak Ada"
                      type="checkbox"
                      id="inlet-checkbox"
                      class="form-check-input"
                      v-model="inletChecked"
                    />
                    <label for="inlet-checkbox" class="form-check-label"
                      >Inlet</label
                    >
                  </div>
                  <ErrorMessage
                    name="waste_discharge_measuring_instrument_inlet"
                  />
              </div>
              <div class="col-md-6" v-if="inletChecked == 'Ada'">
                <div class="form-group">
                  <Field
                    name="waste_discharge_measuring_instrument_inlet_name"
                    as="select"
                    class="form-control"
                  >
                    <option value="" disabled>Pilih Nama Alat Ukur Pembuangan Limbah Masuk</option>
                    <option value="U Notch">U Notch</option>
                    <option value="V Notch">V Notch</option>
                    <option value="Flowmeter">Flowmeter</option>
                  </Field>
                  <ErrorMessage
                    name="waste_discharge_measuring_instrument_inlet_name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 d-flex align-items-center">
              <div class="form-group col-md-1">
                  <div class="form-check me-3">
                    <Field
                      name="waste_discharge_measuring_instrument_outlet"
                      value="Ada"
                      unchecked-value="Tidak Ada"
                      type="checkbox"
                      id="outlet-checkbox"
                      class="form-check-input"
                      v-model="outletChecked"
                    />
                    <label for="outlet-checkbox" class="form-check-label"
                      >Outlet</label
                    >
                  </div>
                  <ErrorMessage
                    name="waste_discharge_measuring_instrument_outlet"
                  />
              </div>
              <div class="col-md-6" v-if="outletChecked == 'Ada'">
                <div class="form-group">
                  <Field
                    name="waste_discharge_measuring_instrument_outlet_name"
                    as="select"
                    class="form-control"
                  >
                    <option value="" disabled>Pilih Nama Alat Ukur Pembuangan Limbah Keluar</option>
                    <option value="U Notch">U Notch</option>
                    <option value="V Notch">V Notch</option>
                    <option value="Flowmeter">Flowmeter</option>
                  </Field>
                  <ErrorMessage
                    name="waste_discharge_measuring_instrument_outlet_name"
                  />
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
                  <Field name="permissible_waste_water_discharge" class="form-control" placeholder="Masukkan Air Limbah Yang Diijinkan"/>
                  <ErrorMessage name="permissible_waste_water_discharge" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label"
                    >Sumber Air Limbah</label
                  >
                  <Field name="waste_water_source" class="form-control" placeholder="Masukkan Sumber Air Limbah" />
                  <ErrorMessage name="waste_water_source" />
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                  <label class="col-form-label"
                    >Sistem IPAL</label
                  >
                  <div class="d-flex flex-wrap">
                    <Field 
                        name="system_ipal">
                    <div class="form-check me-3">
                        <input
                            type="checkbox"
                            value="Fisika"
                            v-model="selectedIPALSystems">
                            Fisika
                        </input>
                    </div>
                    <div class="form-check me-3">
                        <input
                            type="checkbox"
                            value="Kimia"
                            v-model="selectedIPALSystems">
                            Kimia
                        </input>
                    </div>
                    <div class="form-check me-3">
                        <input
                            type="checkbox"
                            value="Biologi"
                            v-model="selectedIPALSystems">
                            Biologi
                        </input>
                    </div>
                    </Field>
                  </div>
                  <ErrorMessage name="system_ipal" />
                </div>
            </div>
          </div>
          <div class="col-12 mt-2">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Upaya Pengelolaan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <FieldArray name="itemz" v-slot="{ fields, push, remove }">
                    <tr v-if="fields.length === 0">
                      <td colspan="2" class="text-center">Data Tidak Ada</td>
                      <td>
                        <button
                          @click="
                            async () => {
                              if (field.value.id) {
                                await deleteupayapengelolaan(field.value.id)
                              }
                              remove(idx)
                            }
                          "
                          type="button"
                          class="btn btn-danger"
                        >
                          -
                        </button>
                        <button
                          @click="
                            push({
                              id: null,
                              recycling_effort: '',
                            })
                          "
                          type="button"
                          class="btn btn-success m-2"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                    <tr v-for="(field, idx) in fields" :key="idx">
                      <td>{{ idx + 1 }}</td>
                      <td>
                        <Field
                          :name="`itemz[${idx}].recycling_effort`"
                          Placeholder="Masukkan Upaya Pengelolaan"
                          class="form-control"
                          type="text"
                        />
                      </td>
                      <td>
                        <button
                          @click="
                            async () => {
                              if (field.value.id) {
                                await deleteupayapengelolaan(field.value.id)
                              }
                              remove(idx)
                            }
                          "
                          type="button"
                          class="btn btn-danger"
                        >
                          -
                        </button>
                        <button
                          @click="
                            push({
                               id: null,
                               recycling_effort: '',
                            })
                          "
                          type="button"
                          class="btn btn-success m-2"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  </FieldArray>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-form-label">Upload Persetujuan Teknis IPAL</label>
                <Field
                  name="ipal_design_note"
                  v-slot="{ field, handleChange }"
                >
                  <input
                    @change="uploadPertekIpal ($event, handleChange)"
                    type="file"
                    class="form-control"
                  />
                  <img
                    :src="field.value"
                    style="
                      max-width: 500px;
                      max-height: auto;
                      object-fit: contain;
                    "
                  /> </Field
                ><br>
                <small class="form-text text-muted"
                  >Maksimal ukuran file: 20MB</small
                >

                <ErrorMessage name="ipal_design_note" />
              </div>
            </div>
        </div>
        <div class="col-12 mt-4">
          <div class="table-responsive">
            <table class="table">
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
                <FieldArray name="items" v-slot="{ fields, push, remove }">
                  <tr v-if="fields.length === 0">
                    <td colspan="4" class="text-center">Data Tidak Ada</td>
                    <td>
                      <button
                        @click="
                          async () => {
                            if (field.value.id) {
                              await deleteipalitem(field.value.id)
                            }
                            remove(idx)
                          }
                        "
                        type="button"
                        class="btn btn-danger"
                      >
                        -
                      </button>
                      <button
                        @click="
                          push({
                            id: null,
                            chemicals_used: '',
                            use_of_chemicals: '',
                            unit_in_use_of_chemicals: '',
                          })
                        "
                        type="button"
                        class="btn btn-success m-2"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                  <tr v-for="(field, idx) in fields" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>
                      <Field
                        :name="`items[${idx}].chemicals_used`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage
                        :name="`items[${idx}].chemicals_used`"
                      />
                    </td>
                    <td>
                      <Field
                        :name="`items[${idx}].use_of_chemicals`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage :name="`items[${idx}].use_of_chemicals`" />
                    </td>
                    <td>
                      <Field
                        :name="`items[${idx}].unit_in_use_of_chemicals`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage :name="`items[${idx}].unit_in_use_of_chemicals`" />
                    </td>
                    <td>
                      <button
                        @click="
                          async () => {
                            if (field.value.id) {
                              await deleteipalitem(field.value.id)
                            }
                            remove(idx)
                          }
                        "
                        type="button"
                        class="btn btn-danger"
                      >
                        -
                      </button>
                      <button
                        @click="
                          push({
                            id: null,
                            chemicals_used: '',
                            use_of_chemicals: '',
                            unit_in_use_of_chemicals: '',
                          })
                        "
                        type="button"
                        class="btn btn-success m-2"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                </FieldArray>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label class="col-form-label"
                 >Badan Air Yang Menerima Limbah</label
                >
                <Field
                    name="water_bodies_receiving_liquid_waste"
                    as="select"
                    class="form-control"
                  >
                    <option value="" disabled>Masukkan Badan Air Yang Menerima Limbah</option>
                    <option value="Cihaur">Cihaur</option>
                    <option value="Cibereum">Cibereum</option>
                    <option value="Cisangkan">Cisangkan</option>
                    <option value="Cimahi">Cimahi</option>
                    <option value="Sungai Cilember">Sungai Cilember</option>
                    <option value="Pemanfaatan">Pemanfaatan</option>
                  </Field>
                <ErrorMessage name="water_bodies_receiving_liquid_waste" />
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label class="col-form-label"
                >Jumlah Lumpur</label
                >
                <Field name="amount_of_mud_sludge" class="form-control" placeholder="Masukkan Jumlah Lumpur" />
                <ErrorMessage name="amount_of_mud_sludge" />
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label class="col-form-label"
                >Satuan Jumlah Lumpur</label
                >
                <Field
                    name="unit_in_amount_of_mud_sludge"
                    as="select"
                    class="form-control"
                  >
                  <option value="" disabled>Masukkan Satuan Jumlah Lumpur</option>
                  <option value="Ton">Ton</option>
                  <option value="Kg">Kg</option>
                  </Field>
                <ErrorMessage name="unit_in_amount_of_mud_sludge" />
            </div>
        </div>
      </div>
      <div>
        <div class="col-md-6">
            <div class="form-group">
                <label class="col-form-label"
                >Penanganan Lumpur Selanjutnya</label
                >
                <Field
                    name="further_sludge_handling"
                    as="select"
                    class="form-control"
                  >
                  <option value="" disabled>Masukkan Penanganan Lumpur Selanjutnya</option>
                  <option value="Diserahkan pada pihak ketiga">
                  Diserahkan pada pihak ketiga
                </option>
                <option value="Dilakukan pengolahan lumpur">
                  Dilakukan pengolahan lumpur
                </option>
                  </Field>
                <ErrorMessage name="further_sludge_handling" />
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="field-btns d-flex justify-content-between">
            <div>
              <button class="btn btn-primary">Simpan</button>
              <router-link to="/Data/IPAL" class="btn btn-secondary m-2"
                >Kembali</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
