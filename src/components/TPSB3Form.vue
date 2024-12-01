<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import * as yup from 'yup'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'
import Swal from 'sweetalert2'
import axios from 'axios'

const $loading = useLoading()
const form = ref(null)

const initialValues = {
  volume_limbah_dalam_izin: 0,
  items: [
    {
      jenis: '',
      volume: null,
      satuan: '',
      jenis_limbah_berdasarkan_sumber: '',
      masa_simpan: '',
    },
  ],
  itemz: [
  ],
}

const deletetpsb3item = async id => {
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
      await axios.delete(`api/companyTpsB3item/${id}`)
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting IPAL:', error)
      Swal.fire('Error!', 'There was an error deleting the IPAL.', 'error')
    } finally {
      loader.hide()
    }
  }
}

const deletetpsb3jenis = async id => {
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
      await axios.delete(`api/companyTpsB3Jenis/${id}`)
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
  sumber_limbah_b3: yup.string().required(),
  koordinat_x: yup.string().required(),
  koordinat_y: yup.string().required(),
  volume_limbah_dalam_izin: yup.number().required(),
  sertifikat_dokumen: yup.string().required(),
  masa_berlaku: yup.string().required(),
  items: yup.array(
    yup.object({
      jenis: yup.string().required(),
      volume: yup.number().required(),
      satuan: yup.string().required(),
      jenis_limbah_berdasarkan_sumber: yup.string().required(),
      masa_simpan: yup.string().required(),
    }),
  ),
  itemz: yup.array(
    yup.object({
      jenis: yup.string().required(),
      photo_izin: yup.string().nullable(),
      tanggal_izin: yup.string().nullable(),
      tanggal_izin_berakhir: yup.string().nullable(),
      pihak_ke3: yup.string().nullable(),
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

  const uploadPhoto = async (e, callback) => {
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

  const uploadFileWrapped = async e => {
    const loader = $loading.show()
    try {
      const url = await uploadFile(e.target.files[0])
      return url
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
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-form-label">No. Rintek</label>
                <Field name="no_rintek" class="form-control" />
                <ErrorMessage name="no_rintek" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="col-form-label">File Rintek</label>
                  <Field name="file_rintek" v-slot="{ field, handleChange }">
                    <input
                      @change="
                        async $event =>
                          handleChange(await uploadFileWrapped($event))
                      "
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
                    />
                  </Field>

                  <ErrorMessage name="file_rintek" />
                </div>
              </div>
            </div>
            <!-- <div class="col-md-6">
              <div class="form-group">
                <label class="col-form-label">Sumber Limbah B3</label>
                <Field name="sumber_limbah_b3" class="form-control" />
                <ErrorMessage name="sumber_limbah_b3" />
              </div>
            </div> -->
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label"
                    >Longitude TPS LB3 (Ex. -123.21312)</label
                  >
                  <Field name="koordinat_x" class="form-control" />
                  <a
                    href="https://www.yogantara.info/"
                    class="text-small"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Konvert dari derajat ke decimal Link</a
                  >
                  <ErrorMessage name="koordinat_x" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label"
                    >Latitude TPS LB3 (Ex. -123.21312)</label
                  >
                  <Field name="koordinat_y" class="form-control" />
                  <ErrorMessage name="koordinat_y" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <!-- <div class="form-group">
              <label class="col-form-label">Volume Limbah B3 Dalam Izin</label>
              <Field
                name="volume_limbah_dalam_izin"
                class="form-control"
                type="number"
              />
              <ErrorMessage name="volume_limbah_dalam_izin" />
            </div> -->
          </div>

          <div class="col-12 mt-4">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jenis Pengelolaan Limbah</th>
                  <th>Dokumen Izin</th>
                  <th>Tanggal Izin</th>
                  <th>Tanggal Izin Berakhir</th>
                  <th>Nama Pihak Ke-3</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <FieldArray name="itemz" v-slot="{ fields, push, remove }">
                  <tr v-if="fields.length === 0">
                    <td colspan="6" class="text-center">Data Tidak Ada</td>
                    <td>
                      <button
                        @click="async () => {
                          if (field.value.id) {
                            await deletetpsb3jenis(field.value.id)
                          }
                          remove(idx)
                        }"
                        type="button"
                        class="btn btn-danger"
                      >
                        -
                      </button>
                      <button
                        @click="push({
                           id: null,
                            jenis: '',
                            pihak_ke3: '',
                            photo_izin: '',
                            tanggal_izin: '',
                            tanggal_berakhir_izin: '',
                        })"
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
                      <Field :name="`itemz[${idx}].jenis`" as="select" class="form-control" v-model="field.jenis">
                        <option value="">Pilih Pengelolaan</option>
                        <option value="Daur Ulang">Melakukan Daur Ulang Limbah B3</option>
                        <option value="Pemanfaatan">Melakukan Pemanfaatan Limbah B3</option>
                        <option value="Pihak Ke 3">Melakukan Kerjasama dengan Pihak Ke-3</option>
                      </Field>
                    </td>
                    <td>
                      <Field :name="`itemz[${idx}].photo_izin`" v-slot="{ field, handleChange }" 
                      v-if="field.jenis === 'Daur Ulang' || field.jenis === 'Pemanfaatan'">
                      <input
                        @change="uploadPhoto($event, handleChange)"
                        type="file"
                        class="form-control"
                      />
                    </Field>
                    </td>
                    <td>
                      <Field
                        :name="`itemz[${idx}].tanggal_izin`"
                        v-if="field.jenis === 'Daur Ulang' || field.jenis === 'Pemanfaatan'"
                        class="form-control"
                        type="date"
                      />
                    </td>
                    <td>
                      <Field
                        :name="`itemz[${idx}].tanggal_berakhir_izin`"
                        v-if="field.jenis === 'Daur Ulang' || field.jenis === 'Pemanfaatan'"
                        class="form-control"
                        type="date"
                      />
                    </td>
                    <td>
                      <Field
                        :name="`itemz[${idx}].pihak_ke3`"
                        v-if="field.jenis === 'Pihak Ke 3'"
                        Placeholder="Masukkan Nama Pihak Ke-3"
                        class="form-control"
                        type="text"
                      />
                    </td>
                    <td>
                      <button
                        @click="async () => {
                          if (field.value.id) {
                            await deletetpsb3item(field.value.id)
                          }
                          remove(idx)
                        }"
                        type="button"
                        class="btn btn-danger"
                      >
                        -
                      </button>
                      <button
                        @click="
                          push({
                            id: null,
                            jenis: '',
                            pihak_ke3: '',
                            photo_izin: '',
                            tanggal_izin: '',
                            tanggal_berakhir_izin: '',
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
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label class="col-form-label">Sertifikat Dokumen Kerjasama</label>
                <Field name="sertifikat_dokumen" v-slot="{ field, handleChange }">
                  <input
                    type="file"
                    @change="uploadDoc($event, handleChange)"
                    class="form-control" />
                  <img
                    :src="field.value"
                    style="
                      max-width: 500px;
                      max-height: auto;
                      object-fit: contain;
                    " /></Field
                ><small class="form-text text-muted"
                  >Maksimal ukuran file: 20MB</small
                >
                <ErrorMessage name="sertifikat_dokumen" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="col-form-label">Masa Berlaku Kerjasama</label>
                  <Field name="masa_berlaku" class="form-control" type="date" />
                  <ErrorMessage name="masa_berlaku" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jenis Limbah Berdasarkan Sumber</th>
                  <th>Jenis Limbah B3</th>
                  <th>Volume Limbah Dalam Izin</th>
                  <th>Satuan Limbah Dalam Izin</th>
                  <th>Masa Simpan (Hari)</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <FieldArray name="items" v-slot="{ fields, push, remove }">
                  <tr v-if="fields.length === 0">
                    <td colspan="6" class="text-center">Data Tidak Ada</td>
                    <td>
                      <button
                        @click="
                          async () => {
                            if (field.value.id) {
                              await deletetpsb3item(field.value.id)
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
                            jenis: '',
                            volume: null,
                            satuan: '',
                            jenis_limbah_berdasarkan_sumber: '',
                            masa_simpan: '',
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
                        :name="`items[${idx}].jenis_limbah_berdasarkan_sumber`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage
                        :name="`items[${idx}].jenis_limbah_berdasarkan_sumber`"
                      />
                    </td>
                    <td>
                      <Field
                        :name="`items[${idx}].jenis`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage :name="`items[${idx}].jenis`" />
                    </td>
                    <td>
                      <Field
                        :name="`items[${idx}].volume`"
                        type="number"
                        class="form-control"
                      />
                      <ErrorMessage :name="`items[${idx}].volume`" />
                    </td>
                    <td>
                      <Field
                        :name="`items[${idx}].satuan`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage :name="`items[${idx}].satuan`" />
                    </td>
                    <td>
                      <Field
                        :name="`items[${idx}].masa_simpan`"
                        type="text"
                        class="form-control"
                      />
                      <ErrorMessage :name="`items[${idx}].masa_simpan`" />
                    </td>
                    <td>
                      <button
                        @click="
                          async () => {
                            if (field.value.id) {
                              await deletetpsb3item(field.value.id)
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
                            jenis: '',
                            volume: null,
                            satuan: '',
                            jenis_limbah_berdasarkan_sumber: '',
                            masa_simpan: '',
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
          <div class="field-btns d-flex justify-content-between">
            <div>
              <button class="btn btn-primary next_btn">Update</button>
              <router-link to="/Data/TPSB3" class="btn btn-secondary m-2"
                >Kembali</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </Form>
  </template>
