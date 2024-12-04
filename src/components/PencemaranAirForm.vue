<script setup>
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import * as yup from 'yup'
import { uploadFile } from '@/lib/filestorage.js'

const props = defineProps(['initialValues'])
const emit = defineEmits('uploaded-document')

const $loading = useLoading()

const form = ref(null)
const files = reactive({})

const initialData = {
  details: [
    {
      parameter: 'Temperatur Udara Sekitar',
      satuan: 'C'
    },
    {
      parameter: 'BOD',
      satuan: 'mg/L'
    },
    {
      parameter: 'COD',
      satuan: 'mg/L'
    },
    {
      parameter: 'TSS',
      satuan: 'mg/L'
    },
    {
      parameter: 'Fenol Total',
      satuan: 'mg/L'
    },
    {
      parameter: 'Krom Total',
      satuan: 'mg/L'
    },
    {
      parameter: 'Amonia Total',
      satuan: 'mg/L'
    },
    {
      parameter: 'Sulfida',
      satuan: 'mg/L'
    },
    {
      parameter: 'Minyak dan Lemak',
      satuan: 'mg/L'
    },
    {
      parameter: 'Warna',
      satuan: 'Pt-Co'
    },
    {
      parameter: 'pH',
      satuan: null
    },
    {
      parameter: 'Temperatur Air',
      satuan: 'C'
    }
  ],
};

const schema = yup.object({
  month: yup.string().required(),
  year: yup.string().required(),
  debit_terukur: yup.number().required(),
  produksi_ton_bulan: yup.number().required(),
  lab_penguji: yup.string().required(),
  tgl_pengambilan_contoh: yup.string().required(),
  details: yup.array().of(yup.object({
    parameter: yup.string().required(),
    hasil_pengukuran: yup.number().required(),
    satuan: yup.string().nullable()
  }))
  // file_hasil_pemeriksaan_lab: yup.number().required(),
  // file_dokumentasi_sampling: yup.number().required(),
  // temp_udara: yup.number().required(),
  // temp_udara_expr: yup.string().required(),
  // bod: yup.number().required(),
  // bod_expr: yup.string().required(),
  // cod: yup.number().required(),
  // cod_expr: yup.string().required(),
  // tss: yup.number().required(),
  // tss_expr: yup.string().required(),
  // fenol_total: yup.number().required(),
  // fenol_total_expr: yup.string().required(),
  // krom_total: yup.number().required(),
  // krom_total_expr: yup.string().required(),
  // amonia_total: yup.number().required(),
  // amonia_total_expr: yup.string().required(),
  // sulfida: yup.number().required(),
  // sulfida_expr: yup.string().required(),
  // minyak_dan_lemak: yup.number().required(),
  // minyak_dan_lemak_expr: yup.string().required(),
  // warna: yup.number().required(),
  // warna_expr: yup.string().required(),
  // ph: yup.number().required(),
  // ph_expr: yup.string().required(),
  // temp_air: yup.number().required(),
  // temp_air_expr: yup.string().required(),
})

const parameters = ref([
  {
    name: 'Temperatur Udara Sekitar',
    satuan: 'C',
    field: 'temp_udara',
  },
  {
    name: 'BOD',
    satuan: 'mg/L',
    field: 'bod',
  },
  {
    name: 'COD',
    satuan: 'mg/L',
    field: 'cod',
  },
  {
    name: 'TSS',
    satuan: 'mg/L',
    field: 'tss',
  },
  {
    name: 'Fenol Total',
    satuan: 'mg/L',
    field: 'fenol_total',
  },
  {
    name: 'Krom Total',
    satuan: 'mg/L',
    field: 'krom_total',
  },
  {
    name: 'Amonia Total',
    satuan: 'mg/L',
    field: 'amonia_total',
  },
  {
    name: 'Sulfida',
    satuan: 'mg/L',
    field: 'sulfida',
  },
  {
    name: 'Minyak dan Lemak',
    satuan: 'mg/L',
    field: 'minyak_dan_lemak',
  },
  {
    name: 'Warna',
    satuan: 'Pt-Co',
    field: 'warna',
  },
  {
    name: 'pH',
    satuan: '',
    field: 'ph',
  },
  {
    name: 'Temperatur Air',
    satuan: 'K',
    field: 'temp_air',
  },
])

const onUploadDocument = async (event, key) => {
  const loader = $loading.show()
  try {
    const url = await uploadFile(event.target.files[0])
    emit('uploaded-document', { key, url })
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const setValues = (data) => {
  form.value.setValues(data)
}

const onInvalidSubmit = (data) => {
  console.log('errro', data)
}

defineExpose({ setValues })
</script>

<template>
    <Form
        ref="form"
          :validation-schema="schema"
          :initial-values="initialData"
          @invalid-submit="onInvalidSubmit"
        >
          <div class="row">
            <div class="col-4">
              <label class="form-label">Bulan</label>
              <Field name="month" class="form-select" as="select">
                <option value="">Pilih</option>
                <option value="Januari">Januari</option>
                <option value="Februari">Februari</option>
              </Field>
              <ErrorMessage name="month" />
            </div>
            <div class="col-4">
              <label class="form-label">Tahun</label>
              <Field name="year" class="form-control" />
              <ErrorMessage name="year" />
            </div>
            <div class="mt-2">
              <div class="col-4">
                <label class="form-label">Debit Terukur</label>
                <Field name="debit_terukur" class="form-control" />
                <ErrorMessage name="debit_terukur" />
              </div>
            </div>
            <div class="mt-2">
              <div class="col-4">
                <label class="form-label">Produksi (Ton/Bulan)</label>
                <Field name="produksi_ton_bulan" class="form-control" />
                <ErrorMessage name="produksi_ton_bulan" />
              </div>
            </div>
            <div class="mt-2">
              <div class="col-4">
                <label class="form-label">Laboratorium Penguji</label>
                <Field name="lab_penguji" class="form-control" />
                <ErrorMessage name="lab_penguji" />
              </div>
            </div>
            <div class="mt-2">
              <div class="col-4">
                <label class="form-label">Tanggal Pengambilan Contoh</label>
                <Field
                  name="tgl_pengambilan_contoh"
                  class="form-control"
                  type="date"
                />
                <ErrorMessage name="tgl_pengambilan_contoh" />
              </div>
            </div>
            <div class="col-4 mt-2">
              <label class="form-label"
                >File Upload Hasil Pemeriksaan Lab (PDF)</label
              >
              <input
                class="form-control"
                type="file"
                @change="onUploadDocument($event, 'file_hasil_pemeriksaan_lab')"
              />
              <small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
            </div>
            <div class="col-4 mt-2">
              <label class="form-label"
                >File Upload Dokumentasi Sampling (PDF)</label
              >
              <input
                class="form-control"
                type="file"
                @change="onUploadDocument($event, 'file_dokumentasi_sampling')"
              />
              <small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
            </div>

            <div>
              <div class="table-resposnive table-div">
                <table class="table datatable">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Hasil Pengukuran</th>
                    </tr>
                  </thead>
                  <tbody>
                    <FieldArray name="details" v-slot="{ fields }">
                      <tr v-for="(field, i) in fields" :key="field.key">
                        <td>{{ field.value.parameter }}</td>
                        <td>
                          <div
                            class="d-flex align-items-center"
                            style="gap: 1rem"
                          >
                            <div class="col-4">
                              <Field
                                :name="`details[${i}].hasil_pengukuran`"
                                class="form-control"
                              />
                              <ErrorMessage :name="`details[${i}].hasil_pengukuran`" />
                            </div>
                            <p class="m-0">{{ field.value.satuan }}</p>
                          </div>
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
