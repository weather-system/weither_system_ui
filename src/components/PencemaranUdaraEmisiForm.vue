<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import * as yup from 'yup'
import { uploadFile } from '@/lib/filestorage.js'
import { getCerobongAcc } from '@/lib/company.js'
import { MONTHS } from '@/lib/utils.js'
import axios from 'axios'

const props = defineProps(['initialValues'])
const emit = defineEmits('uploaded-document')

const $loading = useLoading()

const form = ref(null)
const files = reactive({})
const cerobongs = ref([])
const detailss = ref([])
const initialData = ref({
  jenis: 'Udara Emisi',
  details: [],
})
const schema = yup.object({
  bulan: yup.string().required(),
  tahun: yup.string().required(),
  lab_penguji: yup.string().required(),
  tanggal_uji: yup.string().required(),
  file_hasil_pemeriksaan_lab: yup.string().required(),
  file_dokumentasi_sampling: yup.string().required(),
  details: yup.array().of(
    yup.object({
      hasil_pengujian1: yup.number().required(),
      hasil_pengujian2: yup.number().nullable(),
      hasil_pengujian3: yup.number().nullable(),
      referensi_baku_mutu_detail_id: yup.number().required(),
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
    cerobongs.value = await getCerobongAcc()
    const response = await axios.get('/api/referensiBakuMutuDetail')
    detailss.value = response.data.data
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
const selectedCerobongId = ref(null)
const handleIpalChange = async event => {
  const selectedId = event.target.value
  selectedCerobongId.value = selectedId

  if (!selectedId) {
    return
  }

  try {
    // Cari cerobong yang dipilih
    const selectedCerobong = cerobongs.value.find(
      cerobong => cerobong.id === parseInt(selectedId)
    )

    if (!selectedCerobong) return

    // Ambil jenis_bahan_bakar dari cerobong yang dipilih
    const jenisBahanBakar = selectedCerobong.jenis_bahan_bakar

    // Filter referensi baku mutu berdasarkan jenis bahan bakar
    const filteredDetails = detailss.value.filter(
      detail => detail.bahan_bakar === jenisBahanBakar
    )

    // Mapping data ke dalam tabel details
    initialData.value.details = filteredDetails.map(detail => ({
      referensi_baku_mutu_detail_id: detail.id,
      parameter: detail.parameter,
      satuan: detail.satuan,
    }))

    form.value.setValues({
      ...form.value.values,
      details: initialData.value.details,
    })
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
      <div class="col-md-12">
        <div class="form-group">
          <label class="form-label">Emisi</label>
          <Field
            name="company_cerobong_id"
            class="form-control"
            as="select"
            @change="handleIpalChange($event)"
          >
            <option value="" disabled>Pilih</option>
            <option v-for="d in cerobongs" :key="d.id" :value="d.id">
              Jenis Bahan Bakar : {{ d.jenis_bahan_bakar }}, Jenis Boiler :
              {{ d.jenis_boiler }}, Jumlah Boiler : {{ d.jumlah_boiler }},
              Kapasitas Boiler : {{ d.kapasitas_boiler }}
            </option>
          </Field>
          <ErrorMessage name="company_cerobong_id" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <div class="form-group">
          <label class="form-label">Bulan</label>
          <Field name="bulan" class="form-control" as="select">
            <option value="" disabled>Pilih</option>
            <option v-for="(m, k) in MONTHS" :value="m">{{ m }}</option>
          </Field>
          <ErrorMessage name="bulan" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label class="form-label">Tahun</label>
          <Field name="tahun" class="form-control" />
          <ErrorMessage name="tahun" />
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
            name="tanggal_uji"
            class="form-control"
            type="date"
          />
          <ErrorMessage name="tanggal_uji" />
        </div>
      </div>
    </div>
    <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label"
              >Upload Hasil Pemeriksaan Lab (PDF)</label
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
            NOTE: Menulis angka decimal menggunakan simbol (.) bukan (,).
            Contoh: 123.32
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
                  <td>
                    {{
                      field.value.parameter ||
                      field.value.referensi_baku_mutu_detail?.parameter
                    }}
                  </td>
                  <td>
                    <div class="d-flex align-items-center" style="gap: 1rem">
                      <div class="col-6">
                        <Field
                          :name="`details[${i}].hasil_pengujian1`"
                          class="form-control"
                        />
                        <ErrorMessage
                          :name="`details[${i}].hasil_pengujian1`"
                        />
                      </div>
                      <p class="m-0">
                        {{
                          field.value.satuan ||
                          field.value.referensi_baku_mutu_detail?.satuan
                        }}
                      </p>
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
              <router-link
                to="/Pengendalian/PencemaranUdara?sidebar=PencemaranUdara"
                class="btn btn-secondary m-2"
                >Kembali</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
