<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import * as yup from 'yup'
import { uploadFile } from '@/lib/filestorage.js'
import { getIpalAcc } from '@/lib/company.js'
import { MONTHS } from '@/lib/utils.js'

const props = defineProps(['initialValues'])
const emit = defineEmits('uploaded-document')

const $loading = useLoading()

const form = ref(null)
const files = reactive({})
const ipals = ref([])
const detailss = ref([])
const initialData = ref({
  details: [],
})
const schema = yup.object({
  month: yup.string().required(),
  year: yup.string().required(),
  debit_terukur: yup.number().required(),
  produksi_ton_bulan: yup.number().required(),
  lab_penguji: yup.string().required(),
  tgl_pengambilan_contoh: yup.string().required(),
  catatan: yup.string().nullable(),
  details: yup.array().of(
    yup.object({
      hasil_pengukuran: yup.number().required(),
      referensi_baku_mutu_detail_id : yup.number().required(),
    }),
  ),
})

const onUploadDocument = async (e, callback) => {
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

const onUploadDocument2 = async (e, callback) => {
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

const loadIpals = async () => {
  const loader = $loading.show()
  try {
    ipals.value = await getIpalAcc()
  } catch (e) {
    console.error(e)
  } finally {
    loader.hide()
  }
}

const setValues = data => {
  form.value.setValues(data)
}

const onInvalidSubmit = data => {
  console.log('error', data)
}

onMounted(async () => {
  await loadIpals()
})

defineExpose({ setValues })
const selectedIpalId = ref(null)
const handleIpalChange = async event => {
  const selectedId = event.target.value
  selectedIpalId.value = selectedId
  
  if (!selectedId) {
    return
  }

  try {
    const selectedIpal = ipals.value.find(ipal => ipal.id === parseInt(selectedId))
    const ipalData = selectedIpal.company_ipal

    if (ipalData && ipalData.details) {
      detailss.value = ipalData.details.map(detail => ({
        referensi_baku_mutu_detail_id: detail.id,
        parameter: detail.parameter,
        satuan: detail.satuan,
      }))
    } else {
      detailss.value = [
        {
          referensi_baku_mutu_detail_id: '',
          parameter: 'Parameter Default',
          satuan: 'mg/L',
        },
      ]
    }
    initialData.value.details = [...detailss.value]
    form.value.setValues({ ...form.value.values, details: initialData.value.details })
  } catch (error) {
    console.error('Error fetching IPAL details:', error)
  }
}


// watch(detailss, () => {
//     console.log('Sebelum post:', detailss.value)
//     console.log('arghhhhhhhhhh:', initialData.value.details)
// })
</script>

<template>
  <Form
    ref="form"
    :validation-schema="schema"
    :initial-values="initialData"
    @invalid-submit="onInvalidSubmit"
  >
    <div class="row">
      <div class="col-md-8">
        <div class="form-group">
          <label class="form-label">IPAL</label>
          <Field
            name="company_ipal_id"
            class="form-control"
            as="select"
            @change="handleIpalChange($event)"
          >
            <option value="" disabled>Pilih</option>
            <option v-for="d in ipals" :key="d.id" :value="d.id">
              {{ d.type }}, Sistem IPAL : {{ d.system_ipal }}, Tahun Pembuatan :
              {{ d.year_of_manufacture_of_ipal }}
            </option>
          </Field>
          <ErrorMessage name="company_ipal_id" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <div class="form-group">
          <label class="form-label">Bulan</label>
          <Field name="month" class="form-control" as="select">
            <option value="">Pilih</option>
            <option v-for="(m, k) in MONTHS" :value="m">{{ m }}</option>
          </Field>
          <ErrorMessage name="month" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">  
          <label class="form-label">Tahun</label>
          <Field name="year" class="form-control" />
          <ErrorMessage name="year" />
        </div>
      </div>
    </div>
    <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">Debit Terukur</label>
            <Field type="number" name="debit_terukur" class="form-control" />
            <ErrorMessage name="debit_terukur" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">Satuan</label>
            <Field name="debit_terukur_satuan" class="form-control" as="select">
              <option value="">Pilih</option>
              <option value="m3/hari">m3/hari</option>
              <option value="m3/detik">m3/detik</option>
            </Field>
            <ErrorMessage name="debit_terukur_satuan" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">Produksi (Ton/Bulan)</label>
            <Field name="produksi_ton_bulan" class="form-control" />
            <ErrorMessage name="produksi_ton_bulan" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">Laboratorium Penguji</label>
            <Field name="lab_penguji" class="form-control" />
            <ErrorMessage name="lab_penguji" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">Tanggal Pengambilan Contoh</label>
            <Field
              name="tgl_pengambilan_contoh"
              class="form-control"
              type="date"
            />
            <ErrorMessage name="tgl_pengambilan_contoh" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label"
              >File Upload Hasil Pemeriksaan Lab (PDF)</label
            >
            <Field
                  name="file_hasil_pemeriksaan_lab"
                  v-slot="{ field, handleChange }"
                >
            <input
              class="form-control"
              type="file"
              @change="onUploadDocument($event, handleChange)"
            /><small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
            <iframe
              :src="field.value"
              width="100%"
              height="100%"
            ></iframe>
            </Field
                >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">File Upload Dokumentasi Sampling (PDF)</label>
             <Field
                  name="file_dokumentasi_sampling"
                  v-slot="{ field, handleChange }"
                >
            <input
              class="form-control"
              type="file"
              @change="onUploadDocument2($event, handleChange)"
            />
            <small class="form-text text-muted">Maksimal ukuran file: 20MB</small>
            <iframe
              :src="field.value"
              width="100%"
              height="100%"
            ></iframe>
            </Field
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div>
          <div class="table-responsive">
            <p>
              NOTE: Menulis angka decimal menggunakan simbol (.) bukan (,). Contoh: 123.32
            </p>
            <table class="table datatable">
              <thead>
                <tr>
                  <!-- <th>ID baku mutu</th> -->
                  <th>Parameter</th>
                  <th>Hasil Pengukuran</th>
                </tr>
              </thead>
              <tbody>
                <FieldArray name="details" v-slot="{ fields }">
                  <tr v-for="(field, i) in fields" :key="field.key">
                    <!-- <td>{{ field.value.referensi_baku_mutu_detail_id }}</td> -->
                    <td>{{ field.value.parameter || field.value.referensi_baku_mutu_detail?.parameter }}</td>
                    <td>
                      <div class="d-flex align-items-center" style="gap: 1rem">
                        <div class="col-6">
                          <Field
                            :name="`details[${i}].hasil_pengukuran`"
                            class="form-control"
                          />
                          <ErrorMessage
                            :name="`details[${i}].hasil_pengukuran`"
                          />
                        </div>
                        <p class="m-0">{{ field.value.satuan || field.value.referensi_baku_mutu_detail?.satuan }}</p>
                      </div>
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
              <button class="btn btn-primary">Simpan</button>
              <router-link to="/Pengendalian/PencemaranAir" class="btn btn-secondary m-2"
                >Kembali</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
