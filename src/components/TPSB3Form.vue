<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import * as yup from 'yup'
import { useLoading } from 'vue-loading-overlay'
import { uploadFile } from '@/lib/filestorage.js'

const $loading = useLoading()
const form = ref(null)

const initialValues = {
  items: [
    {jenis: '', volume: null, satuan: ''}
  ]
}

const schema = yup.object({
    sumber_limbah_b3: yup.string().required(),
    koordinat_x: yup.string().required(),
    koordinat_y: yup.string().required(),
    volume_limbah_dalam_izin: yup.number().required(),
    pihak_ke_3: yup.string().required(),
    sertifikat_dokumen: yup.string().required(),
    masa_berlaku: yup.string().required(),
    items: yup.array(yup.object({
      jenis: yup.string().required(),
      volume: yup.number().required(),
      satuan: yup.string().required()
    }))
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

const setValues = (data) => {
  form.value.setValues(data)
}

defineExpose({ setValues })
</script>

<template>
    <Form
    ref="form"
        :validation-schema="schema"
        :initial-values="initialValues"
        >
          <div class="row">
            <div class="mt-2">
                <div class="col-4">
                    <label class="form-label">Sumber Limbah B3</label>
                    <Field name="sumber_limbah_b3" class="form-control" />
                    <ErrorMessage name="sumber_limbah_b3" />
                </div>
                <div class="col-4">
                    <label class="form-label">Koordinat X</label>
                    <Field name="koordinat_x" class="form-control" />
                    <ErrorMessage name="koordinat_x" />
                </div>
                <div class="col-4">
                    <label class="form-label">Koordinat Y</label>
                    <Field name="koordinat_y" class="form-control" />
                    <ErrorMessage name="koordinat_y" />
                </div>
                <div class="col-4">
                    <label class="form-label">Volume Limbah B3 Dalam Izin</label>
                    <Field name="volume_limbah_dalam_izin" class="form-control" type="number" />
                    <ErrorMessage name="volume_limbah_dalam_izin" />
                </div>
                <div class="col-4">
                    <label class="form-label">Pihak Ke 3</label>
                    <Field name="pihak_ke_3" class="form-control" />
                    <ErrorMessage name="pihak_ke_3" />
                </div>
                <div class="col-4">
                    <label class="form-label">Sertifikat Dokumen</label>
                    <Field name="sertifikat_dokumen" v-slot="{ handleChange }">
                      <input type="file" @change="uploadDoc($event, handleChange)" class="form-control" />
                    </Field>
                    <ErrorMessage name="sertifikat_dokumen" />
                </div>
                <div class="col-4">
                    <label class="form-label">Masa Berlaku</label>
                    <Field name="masa_berlaku" class="form-control" type="date" />
                    <ErrorMessage name="masa_berlaku" />
                </div>
                <div class="mt-4">
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
                        <tr
                          v-for="(field, idx) in fields"
                          :key="idx"
                        >
                          <td>{{ idx + 1 }}</td>
                          <td>
                            <Field
                              :name="`items[${idx}].jenis`"
                              type="text"
                              class="form-control"
                            />
                            <ErrorMessage
                              :name="`items[${idx}].jenis`"
                            />
                          </td>
                          <td>
                            <Field
                              :name="`items[${idx}].volume`"
                              type="number"
                              class="form-control"
                            />
                            <ErrorMessage
                              :name="`items[${idx}].volume`"
                            />
                          </td>
                          <td>
                            <Field
                              :name="`items[${idx}].satuan`"
                              type="text"
                              class="form-control"
                            />
                            <ErrorMessage
                              :name="`items[${idx}].satuan`"
                            />
                          </td>
                          <td>
                            <button
                              @click="remove(idx)"
                              type="button"
                              class="btn btn-danger"
                            >
                              -
                            </button>
                            <button @click="push({ jenis: '', volume: null, satuan: '' })" type="button" class="btn btn-success">
                              +
                            </button>
                          </td>
                        </tr>
                      </FieldArray>
                    </tbody>
                  </table>
              </div>
            </div>
            <div class="mt-4">
              <button class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </Form>
</template>
