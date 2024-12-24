<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate'
import { useLoading } from 'vue-loading-overlay'
import * as yup from 'yup'
import { uploadFile } from '@/lib/filestorage.js'
import { MONTHS } from '@/lib/utils.js'
import axios from 'axios'

const props = defineProps(['initialValues'])
const emit = defineEmits('uploaded-document')

const $loading = useLoading()

const referensiBakuMutu = ref([])
const selectedReferensi = ref(null)
const form = ref(null)
const initialData = ref({
  jenis: 'Udara Ambien',
  details: [],
})
const schema = yup.object({
  bulan: yup.string().required(),
  tahun: yup.string().required(),
  lab_penguji: yup.string().required(),
  tanggal_uji: yup.string().required(),
  file_hasil_pemeriksaan_lab: yup.string().required(),
  file_dokumentasi_sampling: yup.string().required(),
  jumlah_titik_uji: yup.string().required(),
  longitude: yup.string().required(),
  latitude: yup.string().required(),
  details: yup.array().of(
    yup.object({
      hasil_pengujian1: yup.number().required(),
      hasil_pengujian2: yup.number().nullable(),
      hasil_pengujian3: yup.number().nullable(),
      referensi_baku_mutu_detail_id: yup.number().required(),
      titik_uji_ambien_id: yup.number().required(),
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
const setValues = data => {
  form.value.setValues(data)
}

const onInvalidSubmit = data => {
  console.log('error', data)
}

defineExpose({ setValues })

onMounted(async () => {
  try {
    const response = await axios.get(
      '/api/referensiBakuMutu?jenis_baku_mutu=Ambien',
    )
    referensiBakuMutu.value = response.data
  } catch (error) {
    Swal.fire('Error!', 'Gagal memuat data Sumber Limbah.', 'error')
  }
})

watch(
  () => form.value?.values.jumlah_titik_uji,
  newValue => {
    if (!newValue || isNaN(newValue)) return
    const jumlahTitik = parseInt(newValue)
    if (jumlahTitik > 0) {
      const newTitikUji = Array.from({ length: jumlahTitik }, () => ({
        longitude: '',
        latitude: '',
        referensi_baku_mutu_id: '',
        details: [],
      }))
      form.value.setFieldValue('titik_uji', newTitikUji)
    }
  },
)
const updateTitikUjiDetails = (index, referensiId) => {
  const selectedRef = referensiBakuMutu.value.find(
    ref => ref.id === Number(referensiId),
  )
  if (selectedRef && selectedRef.details) {
    const newDetails = selectedRef.details.map(detail => ({
      id: detail.id,
      parameter: detail.parameter,
      waktu_pengukuran: detail.waktu_pengukuran,
      sistem_pengukuran: detail.sistem_pengukuran,
      satuan: detail.satuan,
      hasil_pengujian1: null,
    }))
    const currentTitikUji = [...form.value.values.titik_uji]
    currentTitikUji[index] = {
      ...currentTitikUji[index],
      referensi_baku_mutu_id: referensiId,
      details: newDetails,
    }
    form.value.setFieldValue('titik_uji', currentTitikUji)
  }
}
</script>

<template>
  <Form
    ref="form"
    :validation-schema="schema"
    :initial-values="initialData"
    @invalid-submit="onInvalidSubmit"
  >
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
          <Field name="tanggal_uji" class="form-control" type="date" />
          <ErrorMessage name="tanggal_uji" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-label">Upload Hasil Pemeriksaan Lab (PDF)</label>
          <Field
            name="file_hasil_pemeriksaan_lab"
            v-slot="{ field, handleChange }"
          >
            <input
              class="form-control"
              type="file"
              @change="onUploadDocument($event, handleChange)"
            /><small class="form-text text-muted"
              >Maksimal ukuran file: 20MB</small
            >
            <iframe :src="field.value" width="100%" height="100%"></iframe>
          </Field>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-label"
            >File Upload Dokumentasi Sampling (PDF)</label
          >
          <Field
            name="file_dokumentasi_sampling"
            v-slot="{ field, handleChange }"
          >
            <input
              class="form-control"
              type="file"
              @change="onUploadDocument2($event, handleChange)"
            />
            <small class="form-text text-muted"
              >Maksimal ukuran file: 20MB</small
            >
            <iframe :src="field.value" width="100%" height="100%"></iframe>
          </Field>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-label"> Jumlah Uji Titik</label>
          <Field type="number" name="jumlah_titik_uji" class="form-control" />
          <ErrorMessage name="jumlah_titik_uji" />
        </div>
      </div>
    </div>
    <!-- <p>Jumlah Titik Uji: {{ form.values.titik_uji }}</p> -->
    <div v-if="form?.values.titik_uji?.length" class="mb-4">
      <div
        v-for="(titik, index) in form.values.titik_uji"
        :key="`titik-uji-${index}`"
        class="card mt-5"
      >
        <div class="card-header">
          <h4 class="mb-0">Titik Uji {{ index + 1 }}</h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Longitude (Ex. -123.21312)</label>
              <Field
                :name="`titik_uji[${index}].longitude`"
                class="form-control"
              />
              <a
                href="https://www.yogantara.info/"
                class="text-small"
                target="_blank"
                rel="noopener noreferrer"
                >Konvert dari derajat ke decimal Link</a
              >
              <ErrorMessage :name="`titik_uji[${index}].longitude`" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Latitude</label>
              <Field
                :name="`titik_uji[${index}].latitude`"
                class="form-control"
              />
              <ErrorMessage :name="`titik_uji[${index}].latitude`" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label class="col-form-label">Acuan Buku Mutu</label>
              <Field
                as="select"
                :name="`titik_uji[${index}].referensi_baku_mutu_id`"
                class="form-control"
                @change="e => updateTitikUjiDetails(index, e.target.value)"
              >
                <option value="" disabled>Acuan Buku Mutu</option>
                <option
                  v-for="referensi in referensiBakuMutu"
                  :key="referensi.id"
                  :value="referensi.id"
                >
                  {{ referensi.jenis }} - {{ referensi.referensi }}
                </option>
              </Field>
              <ErrorMessage
                :name="`titik_uji[${index}].referensi_baku_mutu_id`"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive">
            <p>
              NOTE: Menulis angka decimal menggunakan simbol (.) bukan (,).
              Contoh: 123.32
            </p>
            <table class="table datatable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Parameter</th>
                  <th>Waktu Pengukuran</th>
                  <th>Sistem Pengukuran</th>
                  <th>Hasil Pengukuran</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(detail, i) in titik.details"
                  :key="`detail-${index}-${i}`"
                >
                  <td>{{ detail.id }}</td>
                  <td>{{ detail.parameter }}</td>
                  <td>{{ detail.waktu_pengukuran }}</td>
                  <td>{{ detail.sistem_pengukuran }}</td>
                  <td>
                    <div class="d-flex align-items-center" style="gap: 1rem">
                      <div class="col-6">
                        <Field
                          :name="`titik_uji[${index}].details[${i}].hasil_pengujian1`"
                          class="form-control"
                          type="number"
                          step="0.01"
                        />
                        <ErrorMessage
                          :name="`titik_uji[${index}].details[${i}].hasil_pengujian1`"
                        />
                      </div>
                      <p class="m-0">{{ detail.satuan }}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
  </Form>
</template>
