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
  items: [{ jenis: '', volume: null, satuan: '' }],
}
const deletetpsb3item = async id => {
  const { isConfirmed } = await Swal.fire({
    title: 'Apa kamu yakin ?',
    text: "Kamu tidak akan bisa mengembalikan ini!",
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
      await axios.delete(`api/companyTpsB3item/${id}`) // Adjust endpoint for deleting IPALs
      // await fetchIpals() // Refresh the IPALs after deletion
      Swal.fire('Deleted!', 'Data berhasil dihapus.', 'success')
    } catch (error) {
      console.error('Error deleting IPAL:', error)
      Swal.fire('Error!', 'There was an error deleting the IPAL.', 'error')
    }finally {
    loader.hide()
  }
  }
}

const schema = yup.object({
  sumber_limbah_b3: yup.string().required(),
  koordinat_x: yup.string().required(),
  koordinat_y: yup.string().required(),
  volume_limbah_dalam_izin: yup.number().required(),
  pihak_ke_3: yup.string().required(),
  sertifikat_dokumen: yup.string().required(),
  masa_berlaku: yup.string().required(),
  items: yup.array(
    yup.object({
      jenis: yup.string().required(),
      volume: yup.number().required(),
      satuan: yup.string().required(),
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

const setValues = data => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
  <Form ref="form" :validation-schema="schema" :initial-values="initialValues">
    <div class="row">
      <div class="col-12 mt-2">
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-form-label">Sumber Limbah B3</label>
              <Field name="sumber_limbah_b3" class="form-control" />
              <ErrorMessage name="sumber_limbah_b3" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label class="col-form-label">Longitude</label>
                <Field name="koordinat_x" class="form-control" />
                <ErrorMessage name="koordinat_x" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="col-form-label">Latitude</label>
                <Field name="koordinat_y" class="form-control" />
                <ErrorMessage name="koordinat_y" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="col-form-label">Volume Limbah B3 Dalam Izin</label>
            <Field
              name="volume_limbah_dalam_izin"
              class="form-control"
              type="number"
            />
            <ErrorMessage name="volume_limbah_dalam_izin" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="col-form-label">Pihak Ke 3</label>
            <Field name="pihak_ke_3" class="form-control" />
            <ErrorMessage name="pihak_ke_3" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label class="col-form-label">Sertifikat Dokumen</label>
              <Field name="sertifikat_dokumen" v-slot="{ handleChange }">
                <input
                  type="file"
                  @change="uploadDoc($event, handleChange)"
                  class="form-control"
                /> </Field
              ><small class="form-text text-muted"
                >Maksimal ukuran file: 20MB</small
              >
              <ErrorMessage name="sertifikat_dokumen" />
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="form-group">
              <label class="col-form-label">Masa Berlaku Kerjasama</label>
              <Field name="masa_berlaku" class="form-control" type="date" />
              <ErrorMessage name="masa_berlaku" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4">
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Jenis</th>
              <th>Volume</th>
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
                    @click="async()=> { 
                      if (field.value.id){
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
                      push({ id: null, jenis: '', volume: null, satuan: '' })
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
                  <button
                    @click="async()=> { 
                      if (field.value.id){
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
                      push({ id: null, jenis: '', volume: null, satuan: '' })
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
      <div class="col-md-12">
        <div class="field-btns d-flex justify-content-between">
          <div>
            <button
              class="btn btn-primary next_btn"
            >
              Update
            </button>
            <router-link to="/Data/TPSB3" class="btn btn-secondary m-2"
              >Kembali</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
